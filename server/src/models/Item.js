import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  type: { type: String, enum: ['lost', 'found'], required: true },
  category: { type: String, trim: true, maxlength: 60, default: 'Other' },
  description: { type: String, required: true, trim: true, minlength: 5, maxlength: 1000 },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  dateOccurred: {
    type: Date,
    required: true,
    validate: { validator: value => value.getTime() <= Date.now() + 24 * 60 * 60 * 1000, message: 'The date cannot be in the future.' }
  },
  imageUrl: {
    type: String,
    trim: true,
    maxlength: 500,
    default: '',
    validate: { validator: value => !value || /^https?:\/\/\S+$/i.test(value), message: 'The image link must start with http:// or https://.' }
  },
  status: { type: String, enum: ['open', 'matched', 'returned'], default: 'open' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

itemSchema.index({ title: 'text', description: 'text', location: 'text' });
itemSchema.index({ reportedBy: 1, createdAt: -1 });
itemSchema.index({ status: 1, type: 1, createdAt: -1 });
export default mongoose.model('Item', itemSchema);
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  type: { type: String, enum: ['lost', 'found'], required: true },
  category: { type: String, trim: true, maxlength: 60, default: 'Other' },
  description: { type: String, required: true, trim: true, minlength: 5, maxlength: 1000 },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  dateOccurred: { type: Date, required: true },
  imageUrl: { type: String, trim: true, maxlength: 500, default: '' },
  status: { type: String, enum: ['open', 'matched', 'returned'], default: 'open' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

itemSchema.index({ title: 'text', description: 'text', location: 'text' });
export default mongoose.model('Item', itemSchema);

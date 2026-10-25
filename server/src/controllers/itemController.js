import Item from '../models/Item.js';

const allowedFields = ['title', 'type', 'category', 'description', 'location', 'dateOccurred', 'imageUrl'];

export async function listItems(req, res, next) {
  try {
    const filter = {};
    if (['lost', 'found'].includes(req.query.type)) filter.type = req.query.type;
    if (['open', 'matched', 'returned'].includes(req.query.status)) filter.status = req.query.status;
    const search = String(req.query.search || '').trim().slice(0, 100);
    if (search) filter.$or = [
      { title: { $regex: escapeRegex(search), $options: 'i' } },
      { description: { $regex: escapeRegex(search), $options: 'i' } },
      { location: { $regex: escapeRegex(search), $options: 'i' } }
    ];
    const page = Math.max(1, Number.parseInt(req.query.page || '1', 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit || '12', 10) || 12));
    const [items, total] = await Promise.all([
      Item.find(filter).populate('reportedBy', 'name').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Item.countDocuments(filter)
    ]);
    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
}

export async function listAllItems(req, res, next) {
  try { res.json(await Item.find().populate('reportedBy', 'name email').sort({ createdAt: -1 }).limit(200)); }
  catch (err) { next(err); }
}

export async function myItems(req, res, next) {
  try { res.json(await Item.find({ reportedBy: req.user._id }).sort({ createdAt: -1 })); }
  catch (err) { next(err); }
}

export async function createItem(req, res, next) {
  try {
    const data = {};
    for (const key of allowedFields) if (req.body[key] !== undefined) data[key] = req.body[key];
    if (!data.title || !data.type || !data.description || !data.location || !data.dateOccurred) {
      return res.status(400).json({ message: 'Title, type, description, location and date are required.' });
    }
    if (!['lost', 'found'].includes(data.type)) return res.status(400).json({ message: 'Type must be lost or found.' });
    const item = await Item.create({ ...data, reportedBy: req.user._id });
    res.status(201).json(item);
  } catch (err) { next(err); }
}

export async function updateItem(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Report not found.' });
    if (String(item.reportedBy) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'You can only edit your own reports.' });
    for (const key of allowedFields) if (req.body[key] !== undefined) item[key] = req.body[key];
    await item.save();
    res.json(item);
  } catch (err) { next(err); }
}

export async function deleteItem(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Report not found.' });
    if (String(item.reportedBy) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'You can only delete your own reports.' });
    await item.deleteOne();
    res.json({ message: 'Report deleted.' });
  } catch (err) { next(err); }
}

export async function setStatus(req, res, next) {
  try {
    if (!['open', 'matched', 'returned'].includes(req.body.status)) return res.status(400).json({ message: 'Status must be open, matched or returned.' });
    const item = await Item.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Report not found.' });
    res.json(item);
  } catch (err) { next(err); }
}

function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
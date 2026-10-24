export function notFound(req, res) {
  res.status(404).json({ message: 'API route not found.' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err?.code === 11000) return res.status(409).json({ message: 'An account with this email already exists.' });
  if (err?.name === 'ValidationError') return res.status(400).json({ message: 'Please check the submitted fields.', errors: Object.values(err.errors).map(e => e.message) });
  if (err?.name === 'CastError') return res.status(400).json({ message: 'Invalid record ID.' });
  res.status(500).json({ message: 'Something went wrong. Please try again later.' });
}

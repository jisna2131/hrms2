import { verifyAccessToken } from '../utils/jwt.js';

export function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = verifyAccessToken(token);
    req.user = payload; // { id, role }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid/expired token' });
  }
}
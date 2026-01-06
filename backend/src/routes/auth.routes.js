// auth.routes.json
import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import {auth} from '../middleware/auth.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ user: req.user });
});

// later: forgot-password, reset-password, etc.

export default router;

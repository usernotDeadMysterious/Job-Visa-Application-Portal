// auth.controller.js 
import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { USER_ROLES } from '../utils/constants.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await hashPassword(password);

    // Only allow non-admin roles from this endpoint for safety
    const safeRole =
      role && [USER_ROLES.STUDENT].includes(role) ? role : USER_ROLES.STUDENT;

    const user = await User.create({
      email,
      passwordHash,
      role: safeRole,
    });

    const token = signToken({ id: user._id, role: user.role });

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.status === 'BLOCKED') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ id: user._id, role: user.role });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

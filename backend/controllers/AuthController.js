import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Footprint from '../models/Footprint.js';
import GuestCache from '../services/GuestCache.js';
import { sendVerificationMail, sendResetPasswordMail } from '../config/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();

const FRONTEND_BASE_URL = (process.env.FRONTEND_BASE_URL || 'http://localhost:3000').replace(
  /\/$/,
  ''
);

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const ip = req.ip;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing Details' });
  }

  // Email format validation
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  // Password length validation
  if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: 'Password must be at least 6 characters' });
  }

  try {
    // checking if exists;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    if (GuestCache[ip]) {
      const guestData = GuestCache[ip];
      const footprint = new Footprint({
        userId: user._id,
        transport: guestData.transportEmissions,
        energy: guestData.electricityEmissions,
        food: guestData.foodEmissions,
        shopping: guestData.shoppingEmissions,
        total: guestData.total,
      });
      await footprint.save();

      let pointsEarned = Math.max(0, Math.min(100, 100 - (guestData.total / 800) * 100));
      user.points = (user.points || 0) + Math.round(pointsEarned);

      delete GuestCache[ip];
    }

    // Code to send verification mail on register step
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });
    user.verificationToken = token;

    try {
      await sendVerificationMail(email, token);
    } catch (mailError) {
      console.error('Mail error:', mailError);
      user.verified = true; // Auto-verify if email fails so user is not locked out
    }
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully.', token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '3h',
    });

    return res.json({ success: true, token, user, message: `Login successful Token : ${token}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById({
      _id: decoded.id,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid token',
      });
    }
    user.verified = true;
    user.verificationToken = null;
    await user.save();

    return res.redirect(`${FRONTEND_BASE_URL}/auth?verified=true`);
  } catch {
    return res.redirect(`${FRONTEND_BASE_URL}/auth?verified=false`);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    user.resetPasswordToken = resetToken;

    await user.save();

    await sendResetPasswordMail(email, resetToken);

    res.json({ success: true, message: 'Reset password link sent to mail successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { register, login, getMe, verifyEmail, resetPassword, forgotPassword };

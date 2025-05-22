const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
const adminMiddleware = require('../middleware/adminMiddleware');
const bcrypt = require('bcryptjs')

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', authenticateToken, adminMiddleware, async (req, res) => {
  const { search } = req.query;
  const query = search ? { username: { $regex: search, $options: 'i' } } : {};
  const users = await User.find(query).select('-password');
  res.json(users);
});

router.post('/', authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, role });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { username, email, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { username, email, role });
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authenticateToken, adminMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

router.post('/upload', authenticateToken, upload.single('profileImage'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profileImage = req.file.path;
    await user.save();
    res.json({ message: 'Profile image uploaded', path: req.file.path });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;
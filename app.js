import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Підключення до MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Головна сторінка
app.get('/', (req, res) => {
  res.send('✅ Server is running and connected to MongoDB');
});

// Маршрут для створення користувача
app.get('/add-user', async (req, res) => {
  const user = new User({
    username: 'testuser',
    email: 'test@example.com',
  });

  await user.save();
  res.send('✅ User saved to MongoDB Atlas');
});

// Маршрут для перегляду користувачів
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

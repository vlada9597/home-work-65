// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from './models/User.js';
// import session from 'express-session';
// import passport from 'passport';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import authRoutes from './routes/auth.js';
// import protectedRoutes from './routes/protected.js';
// import initializePassport from './config/passportConfig.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Підключення до MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Atlas connected successfully'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// // Головна сторінка
// app.get('/', (req, res) => {
//   res.send('✅ Server is running and connected to MongoDB');
// });

// // Маршрут для створення користувача
// app.get('/add-user', async (req, res) => {
//   const user = new User({
//     username: 'testuser',
//     email: 'test@example.com',
//   });

//   await user.save();
//   res.send('✅ User saved to MongoDB Atlas');
// });

// // Маршрут для перегляду користувачів
// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// app.listen(PORT, () => {
//   console.log (`🚀 Server running on http://localhost:${PORT}`);
// });


// // --- Paths ---
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // --- App setup ---
// const app = express();
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(session({
//     secret: 'supersecretkey',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { httpOnly: true, secure: false } // secure: true для HTTPS
// }));

// // --- Passport setup ---
// initializePassport(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// // --- Routes ---
// app.use('/', authRoutes);
// app.use('/', protectedRoutes);

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import User from './models/User.js';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import initializePassport from './config/passportConfig.js';

dotenv.config();

// --- Paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- App init ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- View engine ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middlewares ---
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false }
}));

// --- Passport ---
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// --- Test routes ---
app.get('/', (req, res) => {
  res.send('✅ Server is running and connected to MongoDB');
});

// Create test user
app.get('/add-user', async (req, res) => {
  const user = new User({
    username: 'testuser',
    email: 'test@example.com',
  });

  await user.save();
  res.send('✅ Test user saved to MongoDB');
});

// Show users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// --- App routes ---
app.use('/', authRoutes);
app.use('/', protectedRoutes);

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


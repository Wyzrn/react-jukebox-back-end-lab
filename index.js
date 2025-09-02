// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
const trackRouter = require('./routes/tracks');

const app = express();
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/jukebox';

// Middleware
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/tracks', trackRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Jukebox API!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
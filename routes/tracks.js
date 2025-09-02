// routes/tracks.js
const express = require('express');
const router = express.Router();
const Track = require('../models/track');

// Create a new track
router.post('/', async (req, res) => {
  try {
    const { title, artist, genre } = req.body;
    if (!title || !artist) {
      return res.status(400).json({ error: 'Title and artist are required' });
    }
    const newTrack = new Track({ title, artist, genre });
    const savedTrack = await newTrack.save();
    res.status(201).json(savedTrack);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
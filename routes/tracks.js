// routes/tracks.js
const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

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

// Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single track by ID
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
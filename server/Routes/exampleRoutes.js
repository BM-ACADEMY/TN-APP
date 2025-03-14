const express = require('express');
const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.json({ message: 'Hello from Example API!' });
});

// Example POST route
router.post('/', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received!', data });
});

module.exports = router;

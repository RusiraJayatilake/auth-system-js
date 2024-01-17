const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 4000;

// Database connection
mongoose.connect('mongodb://localhost:27017/login-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

// Route to render HTML page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const bodyParser = require('body-parser');

// Middleware
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// post routes
router.post('/register', userController.registerUser);
router.post('/login', userController.userLogin);

// get routes
router.get('/register', (req, res) => {
   res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});
 
router.get('/login', (req, res) => {
   res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

module.exports = router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Register Users
const registerUser = async (req, res) => {
    try{
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = User({username, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch(err){
        res.status(500).json({err: err.message});
    }
}

// User login
const userLogin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});

        // Check user exists
        if(!user){
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        // Validate the password
        const passwordValid = await user.comparePassword(password);
        if(!passwordValid){
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Access Granted!' });

    } catch (err){
        res.status(500).json({err: err.message});
    }
}

module.exports = { registerUser, userLogin };

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try{
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User({username, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch(err){
        res.status(500).json({err: err.message});
    }
}

module.exports = { registerUser };

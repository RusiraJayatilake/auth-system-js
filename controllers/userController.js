const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

const userLogin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});

        //Secret Key
        const secretKey = crypto.randomBytes(32).toString('hex');

        // Check user exists
        if(!user){
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        // Validate the password
        const passwordValid = await user.comparePassword(password);
        if(!passwordValid){
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token });
        console.log(token);

    } catch (err){
        res.status(500).json({err: err.message});
    }
}

module.exports = { registerUser, userLogin };

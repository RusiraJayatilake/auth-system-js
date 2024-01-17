const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true,  required: true },
    password: { type: String, required: true},
});

userSchema.methods.comparePassword = async function(passwordCandidate){
    try{
        const isMatch = await bcrypt.compare(passwordCandidate, this.password);
        return isMatch;
    } catch (err){
        throw err;
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;



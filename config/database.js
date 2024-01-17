const mongoose = require('mongoose');
require('dotenv').config();

// Database connection
exports.connect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('DB Connected Successfully'))
    .catch((err) => {
        console.error('DB connection error:', err);
        process.exit(1)
    });
}

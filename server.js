const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Database connection
require('./config/database').connect();

app.use('/api/', userRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

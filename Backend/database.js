const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/empleados';

const connectDB = () => mongoose.connect(URI);

module.exports = { mongoose, connectDB };
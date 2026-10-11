const mongoose = require('mongoose');

// Si existe la variable en la nube (Vercel) usa esa, si no, usa la de tu computadora local
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/empleados';

const connectDB = () => mongoose.connect(URI);

module.exports = { mongoose, connectDB };

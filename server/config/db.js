const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
};

module.exports = connectDB;

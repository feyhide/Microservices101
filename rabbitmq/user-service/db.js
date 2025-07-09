import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/user');
    return console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    return console.error('MongoDB connection failed:', err.message);
  }
};

export default connectDB;

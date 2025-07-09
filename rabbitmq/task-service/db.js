import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://mongo:27017/task');
    return console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    return console.error('MongoDB connection failed:', err.message);
  }
};

export default connectDB;

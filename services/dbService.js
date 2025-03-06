import mongoose from 'mongoose';

async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app';
        await mongoose.connect(mongoURI);
        console.log('Connection Established with MongoDB Successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export default connectDB;
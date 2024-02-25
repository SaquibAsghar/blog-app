import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blogify')
        console.log(`[SUCCESS] Connected to MongoDB`)
        
    } catch (error) {
        console.log(`[ERROR]: Failed to connect to MongoDB`)
        
    }

}

export default connectDB;
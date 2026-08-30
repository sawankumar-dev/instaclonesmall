import mongoose from 'mongoose';

export const connectDb = async function () {
    try {
        await mongoose.connect("mongodb://localhost:27017/instagram");
        console.log("Db connected Successfully")
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
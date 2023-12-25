import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "gym"
        };
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('Connected to database....')
    } catch (error) {
        console.log(`Connection Error ${error}`);
    }
};

export default connectDB;
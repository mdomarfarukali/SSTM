import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("\n\n****************** MongoDB connected ******************");
    } catch (err) {
        console.error("\n\n!!!!!!!!!!!!!!!!!!! MongoDB connection error!!!!!!!!!!!!!!!!!!!!", err.message);
        process.exit(1);
    }
};

export default connectToDB;
import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(<string>db);
        log.info("Connected to MongoDB");
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            // useUnifiedTopology: true,
            
    } catch (err : any) {
        log.error(err.message);
        console.error(err.message);
        process.exit(1);
    }
    }

export default connectDB;
import { connect } from "mongoose";

// MongoDB connection URI
const MONGODB_URI = process.env.MONGO_DB_URI;

// Check if the MongoDB URI is defined
if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}

// cashing the connection to avoid multiple connections in development
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

// connectDB function to connect to MongoDB
const connectDB = async () => {

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = connect(MONGODB_URI).then((c) => c.connection)
    }

    try {

        cached.conn = await cached.promise

    } catch (error) {
        throw error;
    }

    return cached.conn;

}

export default connectDB;
import mongoose from "mongoose";

// User interface
interface userInterface {
    _id?: mongoose.Types.ObjectId;
    name: string;
    image: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Creating user schema
const userSchema = new mongoose.Schema<userInterface>({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    image: {
        type: String,
        default: "",
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

}, { timestamps: true, });

// Creating User model
const User = mongoose.models.User || mongoose.model<userInterface>("User", userSchema);

export default User;

// yashchohtel_db_user
// cjVJ0hhPTIwxWqDz
// mongodb+srv://yashchohtel_db_user:cjVJ0hhPTIwxWqDz@cluster0.ain2bcs.mongodb.net/
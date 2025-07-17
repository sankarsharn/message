import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: "https://www.example.com/default-profile.png",
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

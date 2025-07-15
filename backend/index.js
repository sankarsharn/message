import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import chats from './data/data.js';

const app = express();
app.use(express.json());

app.use(cors());
dotenv.config();

app.get('/' , (req , res) => {
    res.send('Hello World');
})

app.get('/api/chats' , (req , res) => {
    res.json(chats);
})

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})

const connectDB = await mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
console.error("Error connecting to MongoDB:", error);
});

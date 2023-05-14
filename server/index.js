import express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messages.js';
import contactRoutes from './routes/ContactRoutes.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contacts", contactRoutes);

mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Server started on port " + process.env.PORT);
});
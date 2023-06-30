import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    friend: {
        type: [String],
        required: true,
        min: 3,
        max: 20,
    },
});

export default mongoose.model('contacts_try', contactSchema);
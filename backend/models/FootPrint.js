import mongoose from "mongoose";

const FootPrintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    transport: {
        type: Number,
        min: 0
    },
    energy: {
        type: Number,
        min: 0
    },
    food: {
        type: Number,
        min: 0
    },
    shopping: {
        type: Number,
        min: 0
    }, 
    total: {
        type: Number,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


}, { indexes: [{ userId: 1 }, { date: 1 }] });

export default FootPrintSchema;
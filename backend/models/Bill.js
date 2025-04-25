import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    units: Number,
    month: String,
    billNumber: String,
    matched: Boolean,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bill", billSchema);

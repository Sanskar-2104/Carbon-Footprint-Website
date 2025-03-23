import mongoose from "mongoose";

const FootPrintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
        
    },
    sessionId: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true
    },
    transport: {
        type: Number,
        min: 0,
        default:0
    },
    energy: {
        type: Number,
        min: 0,
        default:0
    },
    food: {
        type: Number,
        min: 0,
        default:0
    },
    shopping: {
        type: Number,
        min: 0,
        default:0
    }, 
    total: {
        type: Number,
        min: 0,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

FootPrintSchema.index({ userId: 1 });
FootPrintSchema.index({ date: 1 });

export default mongoose.model("Footprint", FootPrintSchema);
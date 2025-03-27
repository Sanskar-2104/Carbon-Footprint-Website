import mongoose from "mongoose";
import crypto from "crypto";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    verified: {  
        type: Boolean,  
        default: false  
    },
    verificationToken: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    points: {
        type: Number,
        default:0
    },
    badges: [String]
}, { timestamps: true });


export default mongoose.model("User", UserSchema);
import mongoose from "mongoose";

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
    points: {
        type: Number,
        default:0
    },
    badges: [String]
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Footprint from '../models/Footprint.js';
import GuestCache from '../services/GuestCache.js';
import { sendVerificationMail } from '../config/nodemailer.js';


const register = async (req, res) => {
    const { name, email, password, ip } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        // checking if exists;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        if (GuestCache[ip]) {
            const guestData = GuestCache[ip];
            const footprint = new Footprint({
                userId: newUser._id,
                transport: guestData.transportEmissions,
                energy: guestData.energyEmissions,
                food: guestData.foodEmissions,
                shopping: guestData.shoppingEmissions,
                total: guestData.total
            });
            await footprint.save();

            delete GuestCache[ip];
        }

        // Code to send verification mail on register step
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.verificationToken = token;
        await user.save();
        await sendVerificationMail(email, token);
        
        res.status(201).json({ message: "User registered succesfully." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        };

        if(!user.verified){
            return res.status(400).json({ message: "Please verify your email first" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user });

        res.json({ success: true, message: `Login successful Token : ${token}` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const verifyEmail = async (req, res) => { 
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ 
            _id: decoded.id
        });
        if (!user) { 
            return res.status(404).json({
                error: "Invalid token",
                message: error.message
            });
        }

    } catch (error) {
        
    }
};

const resetPassword = async (req, res) => { };


export default { register , login, verifyEmail, resetPassword };
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Footprint from '../models/Footprint.js';
import GuestCache from '../services/GuestCache.js';
import { sendVerificationMail, sendResetPasswordMail } from '../config/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


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
        user.verified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Invalid Token",
            message: error.message
        })
    }
};

const forgotPassword = async (req, res) => { 
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found", message: error.message });


        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.resetPasswordToken = resetToken;

        await user.save();

        await sendResetPasswordMail(email, resetToken);

        res.json({success: true, message: "Reset password link sent to mail successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const resetPassword = async (req, res) => { 
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ error: "User not found", message: error.message });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        await user.save();

        res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export default { register , login, verifyEmail, resetPassword, forgotPassword };
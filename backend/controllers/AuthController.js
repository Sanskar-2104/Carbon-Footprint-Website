import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Footprint from '../models/Footprint.js';
import GuestCache from '../services/GuestCache.js';

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

        // const verificationToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        // const verificationLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        // const emailMessage = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
        // await sendEmail(user.email, "Verify Your Email", emailMessage);
        
        res.status(201).json({ message: "User registered succesfully." });
    }
    catch (err) {
        res.json({ success: false, message: err.message });
    }
};

const login = async (req, res) => { };

const verifyEmail = async (req, res) => { };

const resetPassword = async (req, res) => { };


export default { register , login, verifyEmail, resetPassword };
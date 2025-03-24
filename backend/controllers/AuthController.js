import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const register = async (req, res) => { 
    const{name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"Missing Details"});
    }

    try {
        // checking if exists;
        let existingUser = await User.findOne({ email });
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
        const verificationToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        await user.save();

        const verificationLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        const emailMessage = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
        await sendEmail(user.email, "Verify Your Email", emailMessage);
        

        res.status
            (201).json({ message: "User registered. Check Email for verification link." });
    }
    catch (err) { 
        res.json({ success: false, message: err.message });
    }
}
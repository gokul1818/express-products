const User = require("../models/user")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
dotenv.config();

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body; // ✅ Destructure correctly

        // ✅ Validate request body
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // ✅ Check if user already exists
        let user = await User.findOne({ email }); // 🔹 Use findOne() instead of find()

        if (!user) {
            // ✅ Create new user
            user = new User({ name, email });
            await user.save();
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "48h" }
        );

        return res.status(200).json({ token, email });

    } catch (error) {
        console.error("Error in createUser:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find()
        if (userData.length === 0) {
            return res.status(200).json({ message: "No users found" })
        }
        return res.status(200).json(userData)
    } catch (error) {
        console.log(error.message)
    }
}

const getUser = async (req, res) => {
    try {
        const email = req.query.email;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(500).json({ message: "User not found" });
        }
        return res.status(200).json(userData);


    } catch (error) {
        console.log(error.message)
    }

}

const updateUser = async (req, res) => {
    try {
        const email = req.query.email;
        const data = await User.findOne({ email });
        console.log('data: ', data);
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        const { phoneNumber, address } = req.body;

        await User.findByIdAndUpdate(data._id, { phoneNumber, address });
        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        console.log(error.message)
    }
}


const sentNewsLetter = async (req, res) => {
    try {
        const { subject, message } = req.body;

        // 1️⃣ Validate request body
        if (!subject || !message) {
            return res.status(400).json({ message: "Subject and message are required" });
        }

        // 2️⃣ Fetch all user emails
        const users = await User.find({}, "email");
        const emailList = users.map(user => user.email);

        if (emailList.length === 0) {
            return res.status(404).json({ message: "No users found to send emails" });
        }

        // 3️⃣ Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email (Set in .env file)
                pass: process.env.EMAIL_PASS, // Your password or app-specific password
            }
        });

        // 4️⃣ Email options
        const mailOptions = {
            from: `"Dubakur Website" <${process.env.EMAIL_USER}>`,
            bcc: emailList, // Send to all users
            subject: subject,
            text: message
        };

        // 5️⃣ Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Emails sent: ", info.response);

        return res.status(200).json({ message: "Newsletter sent successfully" });

    } catch (error) {
        console.log(error.message)
    }
}

const whatAppOtp = async (req, res) => {
    try {
        const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
        const { phoneNumber } = req.body;
        // Validate request body
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        // Generate OTP
        const otp = generateOTP();

        // Send OTP via Twilio WhatsApp API
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        const message = await client.messages.create({
            body: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:${phoneNumber}` // Recipient's WhatsApp number
        });

        console.log("✅ WhatsApp OTP sent:", message.sid);

        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error("Error in sending OTP:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createUser, getUser, updateUser, getAllUsers, sentNewsLetter, whatAppOtp }
const User = require("../models/user")

const createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, address } = req.body
        // Validate request body
        if (!name || !email) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        // Check if user already exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = new User({
            name, email, phoneNumber, address
        })
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error.message)
    }
}


const getUsers = async (req, res) => {
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
module.exports = { createUser, getUsers, updateUser }
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const { name, email, password, role, community } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role,

            community

        });

        const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    contribution: user.contribution,
    eligible: user.eligible
};

res.status(201).json({
    message: "User Registered Successfully",
    user: userResponse
});

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    register

};
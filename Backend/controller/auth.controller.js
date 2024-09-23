const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/errorHandler');

exports.signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
        // return res.status(400).json({ error: 'All fields are required: fullName, email, password' });
        next(errorHandler(400, 'All fields are required!'))
    }

    try {
        // Check if the user already exists (based on unique email)
        const existingUser = await User.findOne({ where: { email }, logging: true });
        if (existingUser) {
            // return res.status(400).json({ error: 'User with this email already exists' });
            next(errorHandler(400, 'User with this email already exists!'))

        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log("error", error)
        next(error)
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email,fullName:user.fullName }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log("error", error)
        next(error)
    }
};
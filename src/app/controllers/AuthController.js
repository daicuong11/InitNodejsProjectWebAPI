const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Response = require('../api/responses/Response'); // Đảm bảo đường dẫn đúng tới file chứa lớp Response
const User = require('../models/User'); // Đảm bảo đường dẫn đúng tới file mô hình User
require('dotenv').config();

class AuthController {

    // [POST] /api/admin/login
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.json(Response.success('Login successful', { token }));
            } else {
                res.status(401).json(Response.error('Invalid credentials', 401));
            }
        } catch (error) {
            res.status(500).json(Response.error('Server error', 500));
        }
    }

    // [POST] /api/admin/register
    async register(req, res) {
        const { name, email, username, password, image, phoneNumber, facebookUrl, instagramUrl, tiktokUrl } = req.body;

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json(Response.error('User already exists', 400));
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                username,
                password: hashedPassword,
                image,
                phoneNumber,
                facebookUrl,
                instagramUrl,
                tiktokUrl
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.status(201).json(Response.success('User registered successfully', { user: newUser, token }));
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json(Response.error('Server error', 500));
        }
    }
}

module.exports = new AuthController();

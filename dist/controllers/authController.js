"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.loginPage = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// signup controller
// export const signupPage = function(req: Request, res: Response){
//     return res.render("signup", { messages: req.flash() });
// }
const signup = async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;
        // Check if the passwords match
        if (password !== confirmPassword) {
            req.flash('error', "Passwords don't match");
            return res.redirect('back');
        }
        const existingUser = await User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            req.flash('error', 'Email or username already exists , please signup');
            return res.redirect('/auth/login');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        req.flash('success', 'Signup successful!');
        return res.redirect('/auth/login');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.signup = signup;
// login controller
const loginPage = function (req, res) {
    return res.render('login', { messages: req.flash() });
};
exports.loginPage = loginPage;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (user) {
            // Check if the password matches
            const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
            if (passwordMatch) {
                // Create a JWT token
                const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, 'Deep@k2110', { expiresIn: '1h' });
                // Attach the token to the response header or body
                res.cookie('jwt', token);
                return res.redirect(`/user/profile/${user._id}`);
            }
            else {
                req.flash('error', "Passwords don't match");
                return res.redirect('/auth/login'); // Redirect to the login page
            }
        }
        else {
            // Alert the user that the email doesn't exist, please Signup
            req.flash('error', "Email doesn't exist");
            return res.redirect('/'); // Redirect to the login page
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
//  logout
const logout = (req, res) => {
    // Clear the JWT token
    res.clearCookie('jwt');
    req.flash('success', 'Logged out successfully');
    res.redirect('/auth/login');
};
exports.logout = logout;

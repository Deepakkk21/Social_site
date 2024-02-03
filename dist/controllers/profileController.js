"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedNow = exports.updateForm = exports.showProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
//  profile controller
const showProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User_1.default.findById(userId);
        res.render('profile', { user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.showProfile = showProfile;
// to update profile 
const updateForm = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User_1.default.findById(userId);
        if (!user) {
            // Handle case where user is not found
            return res.status(404).send('User not found');
        }
        res.render('update', { user, userId });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updateForm = updateForm;
const updatedNow = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, age } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Update user information
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        await user.save();
        res.redirect(`/user/profile/${userId}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updatedNow = updatedNow;

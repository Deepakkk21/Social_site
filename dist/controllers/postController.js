"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showFeed = exports.handlePost = exports.showForm = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const showForm = (req, res) => {
    const { userId } = req.params;
    res.render('posts', { userId });
};
exports.showForm = showForm;
// to create post
const handlePost = async (req, res) => {
    const inputText = req.body.inputText;
    const inputlocation = req.body.location;
    const Author = req.body.author;
    try {
        const newPost = await Post_1.default.create({ content: inputText, location: inputlocation, author: Author });
        res.redirect('back');
    }
    catch (error) {
        console.error('Error saving post:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.handlePost = handlePost;
//  to show Post feed
const showFeed = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post_1.default.find().sort({ timestamp: -1 }).exec();
        res.render('feed', { posts, userId });
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.showFeed = showFeed;

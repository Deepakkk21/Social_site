"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    location: { type: String, default: 'Mobile' },
    author: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('Post', postSchema);

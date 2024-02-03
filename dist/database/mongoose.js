"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = 'mongodb://127.0.0.1:27017/wasserstoff';
// const url ='mongodb+srv://Deepakk:Deepak2110@cluster0.tt4vu2r.mongodb.net/?retryWrites=true&w=majority';
mongoose_1.default.connect(url);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
connection.on('error', (err) => {
    console.error('MongoDB connection error: ', err);
});
exports.default = connection;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).redirect('/auth/login'); // Redirect to login if no token is present
    }
    jsonwebtoken_1.default.verify(token, 'Deep@k2110', (err, user) => {
        if (err) {
            return res.status(403).redirect('/auth/login'); // Redirect to login if token is invalid
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;

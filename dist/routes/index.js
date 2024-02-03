"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/authController"));
const profileController = __importStar(require("../controllers/profileController"));
const postController = __importStar(require("../controllers/postController"));
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
//auth routes
// router.get('/signup',authController.signupPage)
router.post('/signup', authController.signup);
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
//profile Routes
router.get('/profile/:userId', authentication_1.authenticateToken, profileController.showProfile);
router.get('/update/:userId', authentication_1.authenticateToken, profileController.updateForm);
router.post('/update/:userId', authentication_1.authenticateToken, profileController.updatedNow);
// post  Routes
router.get('/create/:userId', authentication_1.authenticateToken, postController.showForm);
router.post('/create/:userId', authentication_1.authenticateToken, postController.handlePost);
router.get('/feed/:userId', authentication_1.authenticateToken, postController.showFeed);
exports.default = router;

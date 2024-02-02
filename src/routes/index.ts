import express from 'express';
import * as authController from '../controllers/authController';
import * as profileController from '../controllers/profileController';
import * as postController from '../controllers/postController';
import { authenticateToken } from '../middleware/authentication';

const router = express.Router();

//auth routes
// router.get('/signup',authController.signupPage)
router.post('/signup', authController.signup);
router.get('/login',  authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


//profile Routes
router.get('/profile/:userId', authenticateToken, profileController.showProfile);
router.get('/update/:userId',authenticateToken, profileController.updateForm);
router.post('/update/:userId', authenticateToken, profileController.updatedNow);

// post  Routes
router.get('/create/:userId', authenticateToken, postController.showForm);
router.post('/create/:userId',authenticateToken,  postController.handlePost);
router.get('/feed/:userId',authenticateToken, postController.showFeed);

  
export default router;

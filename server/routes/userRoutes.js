import express from 'express';
import { activateAccount, forgotPassword, getUser, login, logout, resetPassword, signup } from '../controllers/userControllers.js';
import { isLoggedIn } from '../middleware/auth.js';

const router=express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activate-account', activateAccount);
router.get('/me', isLoggedIn, getUser);
router.post('/logout', logout);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);


export default router;

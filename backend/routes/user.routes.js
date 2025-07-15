import express from 'express';

import { signup, login, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/signup' , signup);
router.route('/login' , login);
router.route('/signout' , signout);

export default router;
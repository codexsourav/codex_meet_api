import { Router } from 'express';
import { getProfile, login, resetPass, resetPassChange, signup, verify } from '../controller/authController.js';
import middleware from '../middleware/auth.js'

const appRoutes = Router();

appRoutes.post('/api/auth/login', login);
appRoutes.post('/api/auth/signup', signup);
appRoutes.post('/api/auth/verify/:token', verify);
appRoutes.post('/api/auth/reset-password/:email', resetPass);
appRoutes.put('/api/auth/reset-password/:token', resetPassChange);

appRoutes.get('/api/profile', middleware, getProfile);

appRoutes.get('/', middleware, (req, res) => {
    res.send('Hello, World! ');
});


export default appRoutes;
import { Router } from 'express';
import * as authValidation from '../validations/auth.validation';
import * as authController from '../controllers/auth.controller';
import validate from '../middleware/validation';

export default () => {
     const router = Router();

     router.post('/login', validate(authValidation.login), authController.login);
     router.post('/verification/:verifyId', validate(authValidation.verify), authController.verify);

     return router;
};

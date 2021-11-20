import { Router } from 'express';
import * as authValidation from '../validations/auth.validation';
import { verify, login } from '../controllers/auth.controller';
import validate from '../middleware/validation';

export default () => {
     const router = Router();

     router.post('/verification/:verifyId', verify);
     router.post('/login', validate(authValidation.login), login);

     return router;
};

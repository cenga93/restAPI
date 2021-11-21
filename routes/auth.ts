import { Router } from 'express';
import auth from '../middleware/auth';
import * as authValidation from '../validations/auth.validation';
import { me, login, verify } from '../controllers/auth.controller';
import validate from '../middleware/validation';

export default () => {
     const router = Router();

     router.get('/me', auth(), me);
     router.post('/login', auth(), validate(authValidation.login), login);
     router.post('/verification/:verifyId', validate(authValidation.verify), verify);

     return router;
};

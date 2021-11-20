import { Router } from 'express';
import { verify } from '../controllers/auth.controller';

export default () => {
     const router = Router();

     router.post('/verification/:verifyId', verify);

     return router;
};

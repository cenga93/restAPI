import { Router } from 'express';
import user from './user';
import auth from './auth';

export default (): any => {
     const router = Router();

     router.use('/user', user());
     router.use('/auth', auth());

     return router;
};

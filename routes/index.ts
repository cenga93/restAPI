import { Router } from 'express';
import user from './user';
import auth from './auth';

export default (): Router => {
     const router: Router = Router();

     router.use('/user', user());
     router.use('/auth', auth());

     return router;
};

import { Router } from 'express';
import user from './user';
import auth from './auth';
import product from './product';

export default (): Router => {
     const router: Router = Router();

     router.use('/user', user());
     router.use('/product', product());
     router.use('/auth', auth());

     return router;
};

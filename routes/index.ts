import user from './user';
import { Router } from 'express';

export default (): any => {
     const router = Router();

     router.use('/user', user());

     return router;
};

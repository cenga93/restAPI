import { Router } from 'express';
import { getAll,getOne } from '../controllers/user.controller';

export default () => {
     const router = Router();

     router.get('/', getAll);
     router.get('/:userId', getOne);

     return router;
};

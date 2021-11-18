import { Router } from 'express';
import { create, getAll, getOne, remove } from '../controllers/user.controller';

export default () => {
     const router = Router();

     router.get('/', getAll);
     router.get('/:userId', getOne);
     router.delete('/:userId', remove);
     router.post('/', create);

     return router;
};

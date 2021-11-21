import { Router } from 'express';
import { create, getAll, getOne, remove } from '../controllers/user.controller';
import auth from '../middleware/auth';
import { Permissions } from '../config/enums';

export default () => {
     const router = Router();

     router.get('/', getAll);
     router.get('/:userId', auth(Permissions.READ), getOne);
     router.delete('/:userId', remove);
     router.post('/', create);

     return router;
};

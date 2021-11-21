import { Router } from 'express';
import { create, getAll, getOne, remove } from '../controllers/user.controller';
import auth from '../middleware/auth';
import { Permissions } from '../config/enums';

export default () => {
     const router = Router();

     router.post('/', create);
     router.get('/', auth(Permissions.READ), getAll);
     router.get('/:userId', auth(Permissions.READ), getOne);
     router.delete('/:userId', auth(Permissions.DELETE), remove);

     return router;
};

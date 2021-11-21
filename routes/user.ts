import { Router } from 'express';
import { create, getAll, getOne, remove, update } from '../controllers/user.controller';
import auth from '../middleware/auth';
import { Permissions } from '../config/enums';
import validate from '../middleware/validation';
import * as authValidation from '../validations/auth.validation';

export default () => {
     const router = Router();

     router.post('/', validate(authValidation.createUser), create);
     router.get('/', auth(Permissions.READ), getAll);
     router.get('/:userId', auth(Permissions.READ), getOne);
     router.delete('/:userId', auth(Permissions.DELETE), remove);
     router.patch('/:userId', auth(Permissions.UPDATE), validate(authValidation.updateUser), update);

     return router;
};

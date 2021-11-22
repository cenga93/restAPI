import { Router } from 'express';
import auth from '../middleware/auth';
import { Permissions } from '../config/enums';
import validate from '../middleware/validation';
import * as authValidation from '../validations/auth.validation';
import { create, getAll, getOne, remove, update } from '../controllers/user.controller';

export default (): Router => {
     const router: Router = Router();
     const { READ, UPDATE, DELETE } = Permissions;

     router.post('/', validate(authValidation.createUser), create);
     router.get('/', auth(READ), getAll);
     router.get('/:userId', auth(READ), getOne);
     router.patch('/:userId', auth(UPDATE), validate(authValidation.updateUser), update);
     router.delete('/:userId', auth(DELETE), validate(authValidation.deleteUser), remove);

     return router;
};

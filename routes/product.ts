import { Router } from 'express';
import auth from '../middleware/auth';
import { Permissions } from '../config/permissions';
import validate from '../middleware/validation';
import * as productValidation from '../validations/product.validator';
import { create, getAll, getOne, update, remove } from '../controllers/product.controller';

export default (): Router => {
     const router: Router = Router();
     const { CREATE, READ, UPDATE, DELETE } = Permissions.product;

     router.post('/', auth(CREATE), validate(productValidation.createProduct), create);
     router.get('/', auth(READ), getAll);
     router.get('/:productId', auth(READ), validate(productValidation.getOneProduct), getOne);
     router.patch('/:productId', auth(UPDATE), validate(productValidation.updateProduct), update);
     router.delete('/:productId', auth(DELETE), validate(productValidation.removeProduct), remove);

     return router;
};

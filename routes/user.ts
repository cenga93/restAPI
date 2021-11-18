import { Router } from 'express';
import { getAll,getOne ,remove} from '../controllers/user.controller';

export default () => {
     const router = Router();

     router.get('/', getAll);
     router.get('/:userId', getOne);
     router.delete('/:userId', remove);

     return router;
};

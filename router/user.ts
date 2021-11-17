import { Router, Request, Response } from 'express';

export default () => {
     const router = Router();

     router.get('/', (req: Request, res: Response) => {
          console.log('test123');
     });

     return router;
}
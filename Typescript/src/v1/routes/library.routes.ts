import { Router } from "express";
import { LibraryController } from "../controllers";

const libraryRouter = Router();

libraryRouter.get('/library', LibraryController.getInstance().index);
libraryRouter.get('/library/:id');
libraryRouter.post('/library/');
libraryRouter.put('/library/:id');
libraryRouter.delete('/library/:id');

export { libraryRouter };
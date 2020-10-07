import { Router } from 'express';

import StudentsController from '../controllers/StudentsController';

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.post('/', studentsController.create);
studentsRouter.put('/', studentsController.update);
studentsRouter.delete('/:student_id', studentsController.delete);
studentsRouter.get('/', studentsController.index);

export default studentsRouter;

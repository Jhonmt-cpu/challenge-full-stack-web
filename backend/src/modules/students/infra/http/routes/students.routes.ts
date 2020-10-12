import { Router } from 'express';

import StudentsController from '../controllers/StudentsController';
import FindStudentsController from '../controllers/FindStudentsController';

const studentsRouter = Router();
const studentsController = new StudentsController();
const findStudentsController = new FindStudentsController();

studentsRouter.post('/', studentsController.create);
studentsRouter.put('/', studentsController.update);
studentsRouter.delete('/:student_id', studentsController.delete);
studentsRouter.get('/', studentsController.index);
studentsRouter.get('/find', findStudentsController.index);

export default studentsRouter;

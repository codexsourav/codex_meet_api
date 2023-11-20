import { Router } from 'express';
import { createMeet, deleteMeet, getMeet } from '../controller/meetController.js';
import middleware from '../middleware/auth.js'

const meetRoutes = Router();

meetRoutes.get('/api/meet/:id', middleware, getMeet);
meetRoutes.post('/api/meet/:id', middleware, createMeet);
meetRoutes.delete('/api/meet/:id', middleware, deleteMeet);

export default meetRoutes;
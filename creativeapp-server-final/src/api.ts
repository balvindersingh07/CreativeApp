import { Router } from 'express';
import creators from './routes/creators';
import events from './routes/events';
import applications from './routes/applications';
import matches from './routes/matches';

const api = Router();
api.use('/creators', creators);
api.use('/events', events);
api.use('/applications', applications);
api.use('/matches', matches);

export default api;
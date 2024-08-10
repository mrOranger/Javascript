import express from 'express';
import { libraryRouter } from './v1/routes';

const application = express();

application.use('/api/v1', [libraryRouter])

application.listen(80, () => console.log('listening on port 80'));

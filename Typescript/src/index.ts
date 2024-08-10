import express from 'express';

const application = express();

application.listen(8080, () => console.log('listening on port 8080'));

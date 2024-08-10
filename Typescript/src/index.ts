import 'reflect-metadata';
import express from 'express';
import { libraryRouter } from './v1/routes';
import { MySqlDataSource } from './v1/database/mysql.datasource';

MySqlDataSource.initialize().then((dataSource) => {

    console.log(`Database ${dataSource.driver.database} created successfully!`);

    const application = express();

    application.use('/api/v1', [libraryRouter]);

    application.listen(80, () => console.log('listening on port 80'));
});

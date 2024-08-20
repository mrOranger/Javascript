import 'reflect-metadata';
import express from 'express';
import { MySqlDataSource } from './v1/database/mysql.datasource';
import { useContainer, useExpressServer } from 'routing-controllers';
import Container from 'typedi';
import bodyParser from 'body-parser';

MySqlDataSource.initialize().then((dataSource) => {

      const application = express();

      application.use(bodyParser.urlencoded({ extended: false }));
      application.use(bodyParser.json());

      useContainer(Container);
      useExpressServer(application, {
            routePrefix: '/api/v1',
            defaultErrorHandler: false,
            controllers: [`${__dirname}/**/controllers/*{.js,.ts}`],
      });

      application.listen(process.env.SERVER_PORT, () =>
            console.log(`application listening on port ${process.env.SERVER_PORT}`)
      );
});

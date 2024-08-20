import { DataSource } from 'typeorm';
import { Book, Copy, Library } from '../models';

export const MySqlDataSource = new DataSource({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT!,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
      logging: true,
      entities: [Library, Book, Copy],
      subscribers: [],
      migrations: [],
});

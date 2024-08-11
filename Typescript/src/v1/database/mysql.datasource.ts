import { DataSource } from 'typeorm';
import { Library } from '../models';

export const MySqlDataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'library',
      password: 'library',
      database: 'library',
      synchronize: true,
      logging: true,
      entities: [Library],
      subscribers: [],
      migrations: [],
});

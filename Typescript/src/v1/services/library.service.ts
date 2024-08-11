import { Service } from 'typedi';
import { MySqlDataSource } from '../database/mysql.datasource';
import { Library } from '../models';

@Service()
export class LibraryService {
      public index(): Promise<Array<Library>> {
            return MySqlDataSource.getRepository(Library).find();
      }
}

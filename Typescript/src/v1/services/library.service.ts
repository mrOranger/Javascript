import { Service } from 'typedi';
import { MySqlDataSource } from '../database/mysql.datasource';
import { Library, LibraryDTO } from '../models';
import { v4 } from 'uuid';
import { DeleteResult } from 'typeorm';

@Service()
export class LibraryService {
      public index(): Promise<Array<Library>> {
            return MySqlDataSource.getRepository(Library).find({
                  relations: {
                        copies: true,
                  }
            });
      }

      public find(id: string): Promise<Library | null> {
            return MySqlDataSource.getRepository(Library)
                  .findOne({
                        relations: {
                              copies: true
                        },
                        where: {
                              id: id
                        }
                  });
      }

      public save(library: LibraryDTO): Promise<Library> {
            library.id = v4();
            return MySqlDataSource.getRepository(Library).save(library);
      }

      public update(id: string, library: LibraryDTO): Promise<Library> {
            return MySqlDataSource.getRepository(Library).save({ 
                  id: id,
                  name: library.name,
                  location: library.location
            });
      }

      public delete (id: string): Promise<DeleteResult > {
            return MySqlDataSource.getRepository(Library).delete({ id });
      }
 }

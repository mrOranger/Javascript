import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { Copy, CopyDTO } from '../models';
import { MySqlDataSource } from '../database/mysql.datasource';

@Service()
export class CopyService {
      private readonly copyRepository: Repository<Copy>;

      public constructor() {
            this.copyRepository = MySqlDataSource.getRepository(Copy);
      }

      public index() {
            return this.copyRepository.find({
                  relations: {
                        library: true,
                        book: true,
                  },
            });
      }

      public find(id: string) {
            return this.copyRepository.findOne({
                  where: {
                        id,
                  },
                  relations: {
                        library: true,
                        book: true,
                  },
            });
      }

      public findByIdAndLibrary(copyId: string) {
            return this.copyRepository.find({
                  where: {
                        id: copyId,
                  },
                  relations: {
                        library: true,
                        book: true,
                  },
            });
      }

      public findByIdAndBook(copyId: string) {
            return this.copyRepository.find({
                  where: {
                        id: copyId,
                  },
                  relations: {
                        library: true,
                        book: true,
                  },
            });
      }

      public store(copy: CopyDTO) {
            return this.copyRepository.save(copy);
      }

      public delete(id: string) {
            return this.copyRepository.delete(id);
      }
}

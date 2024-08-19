import { Service } from 'typedi';
import { MySqlDataSource } from '../database/mysql.datasource';
import { Book, BookDTO } from '../models';

@Service()
export class BookService {
      public async index(): Promise<Array<Book>> {
            return MySqlDataSource.getRepository(Book).find();
      }

      public async findByLibrary(id: string): Promise<Array<Book>> {
            return MySqlDataSource.getRepository(Book)
                  .createQueryBuilder('book')
                  .select(['isbn', 'title'])
                  .distinct()
                  .innerJoin('book.copies', 'copies')
                  .where('copies.library_id = :id', { id })
                  .getRawMany();
      }

      public async find(isbn: string): Promise<Book | null> {
            return MySqlDataSource.getRepository(Book).findOne({
                  relations: {
                        copies: true,
                  },
                  where: {
                        isbn: isbn,
                  },
            });
      }

      public async save(isbn: string, book: BookDTO) {
            return MySqlDataSource.getRepository(Book).save({
                  isbn: isbn,
                  title: book.title,
            });
      }

      public async delete(isbn: string) {
            return MySqlDataSource.getRepository(Book).delete({ isbn });
      }
}

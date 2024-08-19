import { Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';
import { BookCollection, BookDTO, BookResource } from '../models';
import { BookService } from '../services';
import { Service } from 'typedi';

@JsonController('/book')
@Service()
export class BookController {
      public constructor(private readonly bookService: BookService) {}

      @Get('/')
      public async index(): Promise<BookCollection> {
            const books = await this.bookService.index();
            return Promise.resolve(new BookCollection(books));
      }

      @Get('/library/:id')
      public async findByLibrary(@Param('id') id: string) {
            const books = await this.bookService.findByLibrary(id);
            return Promise.resolve(new BookCollection(books));
      }

      @Get('/:isbn')
      public async find(@Param('isbn') isbn: string) {
            const books = await this.bookService.find(isbn);
            if (books === null) {
                  return books;
            }
            return new BookResource(books);
      }

      @Post('/')
      public async save(@Body() book: BookDTO) {
            const createdBook = await this.bookService.save(book.isbn!, book);
            return new BookResource(createdBook);
      }

      @Put('/:isbn')
      public async update(@Param('isbn') isbn: string, @Body() book: BookDTO) {
            const updatedBook = await this.bookService.save(isbn, book);
            return new BookResource(updatedBook);
      }

      @Delete('/:isbn')
      public async delete(@Param('isbn') isbn: string) {
            return Promise.resolve(this.bookService.delete(isbn));
      }
}

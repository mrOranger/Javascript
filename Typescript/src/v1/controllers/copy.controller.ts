import { v4 } from 'uuid';
import { Service } from 'typedi';
import { CopyService } from '../services/copy.service';
import { CopyCollection, CopyDTO, CopyResource } from '../models';
import { Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';

@JsonController('/copy')
@Service()
export class CopyController {
      public constructor(private readonly copyService: CopyService) {}

      @Get('/')
      public async index() {
            const copies = await this.copyService.index();
            return new CopyCollection(copies);
      }

      @Get('/:id')
      public async find(@Param('id') id: string) {
            const copy = await this.copyService.find(id);
            if (copy != null) {
                  return new CopyResource(copy);
            }
            return copy;
      }

      @Get('/library/:library_id')
      public async findByBook(@Param('library_id') libraryId: string) {
            const copies = (await this.copyService.index()).filter((copy) => copy.library?.id === libraryId);
            return new CopyCollection(copies);
      }

      @Get('/book/:book_isbn')
      public async findByLibrary(@Param('book_isbn') bookIsbn: string) {
            const copies = (await this.copyService.index()).filter((copy) => copy.book?.isbn === bookIsbn);
            return new CopyCollection(copies);
      }

      @Get('/:copy_id/library/:library_id')
      public async findByIdAndLibrary(@Param('copy_id') copyId: string, @Param('library_id') libraryId: string) {
            const copies = (await this.copyService.findByIdAndLibrary(copyId)).filter(
                  (copy) => copy.id === copyId && copy.library?.id === libraryId
            );
            return new CopyCollection(copies);
      }

      @Get('/:copy_id/book/:book_isbn')
      public async findByIdAndBook(@Param('copy_id') copyId: string, @Param('book_isbn') bookIsbn: string) {
            const copies = (await this.copyService.findByIdAndBook(copyId)).filter(
                  (copy) => copy.id === copyId && copy.book?.isbn === bookIsbn
            );
            return new CopyCollection(copies);
      }

      @Post('/')
      public async store(@Body() copy: CopyDTO) {
            copy.id = v4();
            const newCopy = await this.copyService.store(copy);
            if (newCopy != null) {
                  return new CopyResource(copy);
            }
            return null;
      }

      @Put('/:id')
      public async update(@Param('id') id: string, @Body() copy: CopyDTO) {
            copy.id = id;
            const newCopy = await this.copyService.store(copy);
            if (newCopy != null) {
                  return new CopyResource(copy);
            }
            return null;
      }

      @Delete('/:id')
      public async delete(@Param('id') id: string) {
            return this.copyService.delete(id);
      }
}

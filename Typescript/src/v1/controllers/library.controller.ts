import { Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';
import { LibraryService } from '../services';
import { Service } from 'typedi';
import { Library, LibraryDTO } from '../models';
import { DeleteResult } from 'typeorm';

@JsonController('/library') @Service()
export class LibraryController {
      public constructor(private readonly libraryService: LibraryService) {}

      @Get('/')
      public async index() {
            return Promise.resolve(this.libraryService.index());
      }

      @Get('/:id')
      public async find(@Param('id') id: string): Promise<Library | null > {
            return Promise.resolve(this.libraryService.find(id));
      }

      @Post('/')
      public async save(@Body() library: LibraryDTO): Promise<Library> {
            return Promise.resolve(this.libraryService.save(library));
      }

      @Put('/:id')
      public async update(@Param('id') id: string, @Body() library: LibraryDTO): Promise<Library | null > {
            return Promise.resolve(this.libraryService.update(id, library));
      }

      @Delete('/:id')
      public async delete(@Param('id') id: string): Promise<DeleteResult> {
            return Promise.resolve(this.libraryService.delete(id));
      }
}

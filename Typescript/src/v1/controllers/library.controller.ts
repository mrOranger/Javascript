import { Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';
import { LibraryService } from '../services';
import { Service } from 'typedi';
import { LibraryCollection, LibraryDTO, LibraryResource } from '../models';
import { DeleteResult } from 'typeorm';

@JsonController('/library') @Service()
export class LibraryController {
      public constructor(private readonly libraryService: LibraryService) {}

      @Get('/')
      public async index(): Promise<LibraryCollection>{
            const libraries = await this.libraryService.index();
            return Promise.resolve(new LibraryCollection(libraries));
      }

      @Get('/:id')
      public async find(@Param('id') id: string): Promise<LibraryResource | null > {
            const library = await this.libraryService.find(id);
            if (library === null) {
                  return library;
            }
            return new LibraryResource(library);
      }

      @Post('/')
      public async save(@Body() library: LibraryDTO): Promise<LibraryResource> {
            const savedLibrary = await this.libraryService.save(library);
            return Promise.resolve(new LibraryResource(savedLibrary));
      }

      @Put('/:id')
      public async update(@Param('id') id: string, @Body() library: LibraryDTO): Promise<LibraryResource > {
            const updatedLibrary = await this.libraryService.update(id, library);
            return Promise.resolve(new LibraryResource(updatedLibrary));
      }

      @Delete('/:id')
      public async delete(@Param('id') id: string): Promise<DeleteResult> {
            return Promise.resolve(this.libraryService.delete(id));
      }
}

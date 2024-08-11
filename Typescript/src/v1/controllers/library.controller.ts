import { Get, JsonController, Param } from 'routing-controllers';
import { LibraryService } from '../services';
import { Service } from 'typedi';
import { Library } from '../models';

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
}

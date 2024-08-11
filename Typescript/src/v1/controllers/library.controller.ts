import { Get, JsonController } from 'routing-controllers';
import { LibraryService } from '../services';
import { Service } from 'typedi';

@JsonController('/library')
@Service()
export class LibraryController {
      public constructor(private readonly libraryService: LibraryService) {}

      @Get('/')
      public async index() {
            return Promise.resolve(this.libraryService.index());
      }
}

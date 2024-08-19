import { Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';

@JsonController('/books')
export class BookController {
      @Get('/')
      public async index() {}

      @Get('/library/:id')
      public async findByLibrary(@Param('id') id: string) {}

      @Get('/:isbn')
      public async find(@Param('isbn') isbn: string) {}

      @Post('/')
      public async save() {}

      @Put('/:isbn')
      public async update(@Param('isbn') isbn: string) {}

      @Delete('/:isbn')
      public async delete(@Param('isbn') isbn: string) {}
}

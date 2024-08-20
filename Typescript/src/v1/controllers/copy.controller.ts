import { Delete, Get, JsonController, Post, Put } from 'routing-controllers';
import { Service } from 'typedi';
import { NotImplementedException } from '../exceptions';

@JsonController('/copy')
@Service()
export class CopyController {

    @Get('/')
    public index() {
        return new NotImplementedException().toString();
    }

    @Get('/:id')
    public find() {
        return new NotImplementedException().toString();
    }

    @Post('/')
    public store() {
        return new NotImplementedException().toString();
    }

    @Put('/:id')
    public update() {
        return new NotImplementedException().toString();
    }

    @Delete('/:id')
    public delete() {
        return new NotImplementedException().toString();
    }
}

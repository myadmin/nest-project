import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('公共接口')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('list')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('all')
    getAll(): string[] {
        return this.appService.getAll();
    }

    @Post('list')
    create(obj: Record<string, any>): boolean {
        return this.appService.createUser(obj);
    }

    @Get('user_*')
    getUser() {
        return 'getUser';
    }

    @Put('list/user')
    updateUser() {
        return 'put';
    }

    @Get('list/:id')
    update() {
        return 'update';
    }
}

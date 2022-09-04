import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: '注册用户' })
    @ApiResponse({ status: 201, type: [UserEntity] })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    register(@Body() createUser: CreateUserDto) {
        return this.userService.registry(createUser);
    }

    @ApiOperation({ summary: '获取用户信息' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUserInfo(@Req() req) {
        return req.user;
    }
}

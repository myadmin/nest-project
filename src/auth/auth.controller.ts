import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Post, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Body() user: LoginDto, @Req() req) {
        return await this.authService.login(req.user);
    }
}

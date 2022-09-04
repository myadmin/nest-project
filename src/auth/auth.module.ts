import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { LocalStorage } from './local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtStorage } from './jwt.strategy';
import { UserModule } from '../user/user.module';

// const jwtModule = JwtModule.register({
//     secret: 'test123456',
//     signOptions: { expiresIn: '4h' }
// });

const jwtModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        return {
            secret: configService.get('SECRET'),
            signOptions: { expiresIn: '4h' }
        };
    },
})

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, jwtModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStorage, JwtStorage],
    exports: [jwtModule]
})
export class AuthModule { }

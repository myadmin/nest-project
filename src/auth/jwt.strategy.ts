import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';

export class JwtStorage extends PassportStrategy(Strategy) {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('SECRET'),
        } as StrategyOptions);
    }

    async validate(user: UserEntity) {
        const exisUser = await this.authService.getUser(user);
        if (!exisUser) {
            throw new UnauthorizedException('token不正确');
        }
        return exisUser;
    }
}

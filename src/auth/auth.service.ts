import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    // 生成token
    createToken(user: Partial<UserEntity>) {
        return this.jwtService.sign(user);
    }

    async login(user: Partial<UserEntity>) {
        const token = this.createToken({
            id: user.id,
            username: user.username,
            role: user.role
        });

        return { token };
    }

    async getUser(user: Partial<UserEntity>) {
        return await this.userService.findOne(user.id);
    }
}

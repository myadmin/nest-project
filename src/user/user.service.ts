import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async registry(createUser: CreateUserDto) {
        const { username } = createUser;

        const exisUser = await this.userRepository.findOne({
            where: { username }
        });

        if (exisUser) {
            throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST);
        }

        const newUser = this.userRepository.create(createUser);
        await this.userRepository.save(newUser);
        return await this.userRepository.findOne({ where: { username } })
    }

}

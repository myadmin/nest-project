import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
    @ApiProperty({ description: '用户id' })
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ length: 100, nullable: true })
    username: string;

    @Column({ length: 100, nullable: true })
    nickname: string;

    @Exclude()
    @Column({ select: false, nullable: true })
    password: string;

    @Column({ default: null })
    avatar: string;

    @Column({ default: null })
    email: string;

    @Column('simple-enum', { enum: ['root', 'author', 'visitor'], default: 'visitor' })
    role: string; // 用户角色

    @Column({ name: 'create_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime: Date;

    @Column({ name: 'update_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateTime: Date;

    @BeforeInsert()
    async encryptPwd() {
        if (!this.password) return;
        this.password = await bcrypt.hashSync(this.password, 10);
    }
}

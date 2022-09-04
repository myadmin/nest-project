import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
// import { PostsEntity } from './posts/posts.entity';
// import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import envConfig from '../config/env';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [envConfig.path],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            // autoLoadEntities: true,
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql', // 数据库类型
                entities: ["dist/**/*.entity{.ts,.js}"], // 数据表实体
                host: configService.get('DB_HOST'), // 主机，默认为localhost
                port: configService.get<number>('DB_PORT'), // 端口号
                username: configService.get('DB_USER'), // 用户名
                password: configService.get('DB_PASSWORD'), // 密码
                database: configService.get('DB_DATABASE'), //数据库名
                timezone: '+08:00', //服务器上配置的时区
                synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
            }),
        }),
        PostsModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

// @Module({
//     imports: [TypeOrmModule.forRoot({
//         autoLoadEntities: true
//     }), PostsModule],
//     controllers: [AppController],
//     providers: [AppService],
// })
export class AppModule { }

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PostsEntity } from './posts/posts.entity';
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
                entities: [PostsEntity], // 数据表实体
                host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
                port: configService.get<number>('DB_PORT', 3306), // 端口号
                username: configService.get('DB_USER', 'root'), // 用户名
                password: configService.get('DB_PASSWORD', '123456'), // 密码
                database: configService.get('DB_DATABASE', 'node'), //数据库名
                timezone: '+08:00', //服务器上配置的时区
                synchronize: false, //根据实体自动创建数据库表， 生产环境建议关闭
            }),
        }),
        PostsModule,
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

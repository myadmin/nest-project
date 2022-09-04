import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    // 全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局拦截器
    app.useGlobalInterceptors(new TransformInterceptor());
    // 全局校验器
    app.useGlobalPipes(new ValidationPipe());

    // 设置swagger文档
    const config = new DocumentBuilder()
        .setTitle('后台管理系统')
        .setDescription('后台管理系统接口文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    // 设置端口
    await app.listen(3000);
}
bootstrap();


/**
 * 语法：nest g [文件类型] [文件名] [文件目录] 目录如果不写，按文件名创建目录
 * 1. nest g mo name 创建 module
 * 2. nest g co name 创建 controller
 * 3. nest g service name 创建 service
 * 按照创建顺序创建文件，会自动在 Module 中注册
 */

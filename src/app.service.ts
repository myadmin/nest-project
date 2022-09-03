import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getAll(): string[] {
        return ['aaa', 'bbb', 'cccc'];
    }

    createUser(user: Record<string, any>): boolean {
        return !!user;
    }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';

export interface PostsRo {
    list: PostsEntity[];
    count: number;
}

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
    ) { }

    /**
     * 创建文章
     * @param post Object
     * @returns Promise
     */
    async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
        const { title } = post;
        if (!title) {
            throw new HttpException('缺少文章标题', 401);
        }

        const doc = await this.postsRepository.findOne({ where: { title } });
        if (doc) {
            throw new HttpException('文章已存在', 401);
        }

        return await this.postsRepository.save(post);
    }

    /**
     * 获取文章列表
     * @param query
     */
    async findAll(query: Record<string, any>): Promise<PostsRo> {
        const qb = getRepository(PostsEntity).createQueryBuilder('post');
        qb.where('1 = 1');
        qb.orderBy('post.create_time', 'DESC');

        const count = await qb.getCount();
        const { pageNum = 1, pageSize = 10 } = query;
        qb.limit(pageSize);
        qb.offset(pageSize * (pageNum - 1));

        const posts = await qb.getMany();
        return { list: posts, count };
    }

    /**
     * 获取指定文章
     * @param id string
     * @returns Promise
     */
    async findById(id: string): Promise<PostsEntity> {
        const existPost = await this.postsRepository.findOne(id);
        if (!existPost) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }
        return existPost;
    }

    /**
     * 更新文章
     * @param id string
     * @param post PostsEntity
     * @return Promise
     */
    async updateById(id: string, post: Partial<PostsEntity>): Promise<PostsEntity> {
        const existPost = await this.postsRepository.findOne(id);
        if (!existPost) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }
        const updatePost = this.postsRepository.merge(existPost, post);
        return this.postsRepository.save(updatePost);
    }

    /**
     * 删除文章
     * @param id string
     * @returns 
     */
    async remove(id: string) {
        const existPost = await this.postsRepository.findOne(id);
        if (!existPost) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }
        return await this.postsRepository.remove(existPost);
    }
}

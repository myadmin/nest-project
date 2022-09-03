import {
    Controller,
    Body,
    Delete,
    Get,
    Post,
    Param,
    Put,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostsService, PostsRo } from './posts.service';
import { CreatePostDto } from './dto/create-post.dot';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    /**
     * 创建文章
     * @param post
     */
    @ApiOperation({ summary: '创建文章' })
    @Post()
    async create(@Body() post: CreatePostDto) {
        return await this.postsService.create(post);
    }

    /**
     * 获取所有文章
     * @param query 
     * @returns 
     */
    @ApiOperation({ summary: '获取所有文章' })
    @Get()
    async findAll(@Query() query): Promise<PostsRo> {
        return await this.postsService.findAll(query);
    }

    /**
     * 获取指定文章
     * @param id string
     * @returns 
     */
    @ApiOperation({ summary: '获取指定文章' })
    @Get(':id')
    async findById(@Param('id') id: string) {
        const data = await this.postsService.findById(id);
        console.log(data);
        if (data) {
            return data;
        } else {
            return {};
        }
    }

    /**
     * 更新文章
     * @param id string
     * @param post PostsEntity
     * @returns post
     */
    @ApiOperation({ summary: '更新文章' })
    @Put(':id')
    async update(@Param('id') id: string, @Body() post: CreatePostDto) {
        return await this.postsService.updateById(id, post);
    }

    /**
     * 删除文章
     * @param id string
     */
    @ApiOperation({ summary: '删除文章' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.postsService.remove(id);
    }
}

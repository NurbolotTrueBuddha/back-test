import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  // create(@Body() createPostDto) {
  //   return this.postService.create(createPostDto);
  // }
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.postService.remove(slug);
  }
}

import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwtGuard } from 'src/auth/framework/guards';
import { PostInteractor } from './post.interactor';
import { CreatePostDto } from './usecases/dto/create-post.dto';
import { User } from 'src/auth/framework/decorators';
import { UserDto } from './usecases/dto/user.dto';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(UserJwtGuard)
export class PostController {
  constructor(private readonly interactor: PostInteractor) {}

  @Post()
  create(@Body() dto: CreatePostDto, @User() user: UserDto) {
    dto.userId = user.userId;
    return this.interactor.create(dto);
  }

  @Get()
  findAll() {
    return this.interactor.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.interactor.findOne(slug);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserDto) {
    return this.interactor.remove(id, user.userId);
  }
}

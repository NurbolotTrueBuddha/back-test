import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto } from './usecases/dto/create-post.dto';
import {
  CreatePostCommand,
  DeletePostCommand,
} from './usecases/commands/implementation';
import {
  FindAllPostsQuery,
  FindPostBySlugQuery,
} from './usecases/queries/implementation';

@Injectable()
export class PostInteractor {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async create(dto: CreatePostDto) {
    return this.commandBus.execute(new CreatePostCommand(dto));
  }

  async findAll() {
    return this.queryBus.execute(new FindAllPostsQuery());
  }

  async findOne(slug: string) {
    return this.queryBus.execute(new FindPostBySlugQuery(slug));
  }

  async remove(slug: string, userId: string) {
    return this.commandBus.execute(new DeletePostCommand(slug, userId));
  }
}

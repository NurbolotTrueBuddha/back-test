import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostInteractor } from './post.interactor';
import { DataAccess } from './data-access';
import { CqrsModule } from '@nestjs/cqrs';
import { UseCases } from './usecases';

@Module({
  imports: [TypeOrmModule.forFeature(DataAccess), CqrsModule],
  providers: [PostInteractor, ...UseCases],
  controllers: [PostController],
})
export class PostModule {}

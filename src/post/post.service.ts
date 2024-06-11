// post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './data-access/pg';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(postData): Promise<Post> {
    const post = this.postRepository.create(postData);
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findBySlug(slug: string): Promise<Post> {
    return this.postRepository.findOne({ where: { slug } });
  }

  async remove(slug: string): Promise<void> {
    await this.postRepository.delete({ slug });
  }
}

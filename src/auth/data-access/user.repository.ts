import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './pg';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly orm: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.orm.findOne({ where: { username } });
  }
}

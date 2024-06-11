import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { FindAllPostsQuery } from '../implementation';
import { Post } from 'src/post/data-access/pg';

@QueryHandler(FindAllPostsQuery)
export class GetDistributorByHandler
  implements IQueryHandler<FindAllPostsQuery>
{
  constructor(private readonly connection: Connection) {}

  async execute(query: FindAllPostsQuery): Promise<Post[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    let posts: Post[];

    try {
      await queryRunner.startTransaction();
      posts = await queryRunner.query('SELECT * FROM posts');
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return posts;
  }
}

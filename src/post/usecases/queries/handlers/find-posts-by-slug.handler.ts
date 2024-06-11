import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { FindPostBySlugQuery } from '../implementation';
import { Post } from 'src/post/data-access/pg';

@QueryHandler(FindPostBySlugQuery)
export class GetDistributorByHandler
  implements IQueryHandler<FindPostBySlugQuery>
{
  constructor(private readonly connection: Connection) {}

  async execute(query: FindPostBySlugQuery): Promise<Post[]> {
    const { slug } = query;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      const posts = await queryRunner.query(
        'SELECT * FROM posts WHERE slug = $1',
        [slug],
      );
      await queryRunner.commitTransaction();
      return posts;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

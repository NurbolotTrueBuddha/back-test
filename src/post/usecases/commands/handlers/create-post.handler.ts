import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { CreatePostCommand as Command } from '../implementation';
import { Post } from 'src/post/data-access/pg';

@CommandHandler(Command)
export class CreatePostHandler implements ICommandHandler<Command> {
  constructor(private readonly connection: Connection) {}

  async execute(command: Command): Promise<Post> {
    const { createPostDto } = command;
    const { title, content, slug, categorySlug, subCategorySlug, userId } = createPostDto;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const category = await queryRunner.query('SELECT id FROM Categories WHERE slug = $1', [categorySlug]);
      if (!category) {
        throw new Error('Category not found');
      }

      let subcategoryId = null;
      if (subCategorySlug) {
        const subcategory = await queryRunner.query('SELECT id FROM Subcategories WHERE slug = $1', [subCategorySlug]);
        if (!subcategory) {
          throw new Error('Subcategory not found');
        }
        subcategoryId = subcategory.id;
      }

      const result = await queryRunner.query(
        'INSERT INTO posts (title, content, slug, category_id, subcategory_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [title, content, slug, category.id, subcategoryId, userId]
      );

      await queryRunner.commitTransaction();

      return result[0];
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

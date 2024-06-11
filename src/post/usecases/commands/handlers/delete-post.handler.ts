import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { DeletePostCommand as Command } from '../implementation';

@CommandHandler(Command)
export class DeletePostHandler implements ICommandHandler<Command> {
  constructor(private readonly connection: Connection) {}

  async execute(command: Command) {
    const { slug, userId } = command;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      await queryRunner.query(
        'DELETE FROM posts WHERE slug = $1 AND user_id = $2',
        [slug, userId],
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return 'ok';
  }
}

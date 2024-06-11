import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

export const UseCases = [...CommandHandlers, ...QueryHandlers];

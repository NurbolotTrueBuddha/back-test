import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SwaggerCustomOptions } from '@nestjs/swagger';

export type SwaggerOptions = {
  path: string;
  options: Pick<SwaggerCustomOptions, 'swaggerOptions'>;
};

@Injectable()
export class ConfigurationService {
  constructor(private config: ConfigService) {}
  get url(): string {
    return this.config.get<string>('config.url');
  }

  get host(): string {
    return this.config.get<string>('config.host');
  }

  get port(): number {
    return Number(this.config.get<number>('config.port'));
  }

  get swagger(): SwaggerOptions {
    return this.config.get<SwaggerOptions>('config.swagger');
  }

  get environment(): string {
    return this.config.get<string>('config.env');
  }

  get database(): TypeOrmModuleOptions {
    return this.config.get<TypeOrmModuleOptions>('config.database.mysql');
  }
}

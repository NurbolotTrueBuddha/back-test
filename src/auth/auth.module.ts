import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './framework/stratagies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAccess } from './data-access';
import { ConfigurationModule } from 'src/config/configuration.module';
import { Framework } from './framework';
import { ConfigurationService } from 'src/config/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(DataAccess),
    PassportModule,
    ConfigurationModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AuthService, ...Framework, ConfigurationService],
  exports: [AuthService],
})
export class AuthModule {}

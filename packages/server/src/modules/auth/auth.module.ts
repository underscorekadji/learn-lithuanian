import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigurationModule } from '../configuration/configuration.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './configuration/jwt.config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigurationModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

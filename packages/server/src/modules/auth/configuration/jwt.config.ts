import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtModuleAsyncOptions } from '@nestjs/jwt';

import { ConfigKeys } from '../../configuration/configuration.enum';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<JwtModuleOptions> => ({
    secret: configService.get<string>(ConfigKeys.JWT_SECRET),
    signOptions: {
      expiresIn: configService.get<string>(ConfigKeys.JWT_EXPIRATION_TIME),
    },
  }),
  inject: [ConfigService],
};

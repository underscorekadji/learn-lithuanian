import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ConfigKeys } from './configuration.enum';

const validationSchema = Joi.object({
  [ConfigKeys.DATABASE_HOST]: Joi.string().required(),
  [ConfigKeys.DATABASE_PORT]: Joi.number().default(5432),
  [ConfigKeys.DATABASE_USERNAME]: Joi.string().required(),
  [ConfigKeys.DATABASE_PASSWORD]: Joi.string().required(),
  [ConfigKeys.DATABASE_NAME]: Joi.string().required(),
  [ConfigKeys.DATABASE_SYNCHRONIZE]: Joi.boolean().default(true),
  [ConfigKeys.DATABASE_LOGGING]: Joi.boolean().default(true),
  [ConfigKeys.JWT_SECRET]: Joi.string().required(),
  [ConfigKeys.JWT_EXPIRATION_TIME]: Joi.string().default('1h'),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigurationModule {}

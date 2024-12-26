import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../modules/configuration/configuration.enum';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>(ConfigKeys.DATABASE_HOST),
  port: parseInt(
    configService.get<string>(ConfigKeys.DATABASE_PORT) || '5432',
    10,
  ),
  username: configService.get<string>(ConfigKeys.DATABASE_USERNAME),
  password: configService.get<string>(ConfigKeys.DATABASE_PASSWORD),
  database: configService.get<string>(ConfigKeys.DATABASE_NAME),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: configService.get<boolean>(ConfigKeys.DATABASE_SYNCHRONIZE),
  logging: configService.get<boolean>(ConfigKeys.DATABASE_LOGGING),
});

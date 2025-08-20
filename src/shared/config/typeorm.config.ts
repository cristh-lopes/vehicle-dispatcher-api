import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { EnvConfigParser } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: EnvConfigParser.getDbHost()!,
  port: EnvConfigParser.getDbPort()!,
  username: EnvConfigParser.getDbUser()!,
  password: EnvConfigParser.getDbPass()!,
  database: EnvConfigParser.getDbName()!,
  logging: false,
  migrationsRun: true,
  entities: [
    __dirname + '/../../modules/**/database/entities/*.entity{.ts,.js}',
    __dirname + '/../../shared/database/entities/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../../shared/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);
export default dataSource;

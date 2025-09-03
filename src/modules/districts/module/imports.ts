import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { CustomHttpModule } from '@shared/core/custom-http-module/custom-http.module';
import { FirebaseModule } from '@shared/core/firebase';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

import { District } from '@districts/database/entities/district.entity';

export const districtModuleImports = [
  TypeOrmModule.forFeature([District]),
  CustomHttpModule,
  AppLoggerModule,
  EnvConfigModule,
  FirebaseModule,
  GuardsModule,
];

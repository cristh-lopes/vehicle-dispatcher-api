import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { CustomHttpModule } from '@shared/core/custom-http-module/custom-http.module';
import { FirebaseModule } from '@shared/core/firebase';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

export const dispatcherModuleImports = [
  TypeOrmModule.forFeature([]),
  CustomHttpModule,
  AppLoggerModule,
  EnvConfigModule,
  FirebaseModule,
  GuardsModule,
];

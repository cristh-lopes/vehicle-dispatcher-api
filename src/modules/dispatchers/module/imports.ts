import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { CustomHttpModule } from '@shared/core/custom-http-module/custom-http.module';
import { FirebaseModule } from '@shared/core/firebase';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

import { Dispatcher } from '@dispatchers/database/entities/dispatcher.entity';
import { Plan } from '@dispatchers/database/entities/plan.entity';

export const dispatcherModuleImports = [
  TypeOrmModule.forFeature([Dispatcher, Plan]),
  CustomHttpModule,
  AppLoggerModule,
  EnvConfigModule,
  FirebaseModule,
  GuardsModule,
];

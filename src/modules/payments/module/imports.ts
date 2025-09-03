import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { FirebaseModule } from '@shared/core/firebase/firebase.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

export const paymentModuleImports = [
  EnvConfigModule,
  TypeOrmModule.forFeature([]),
  FirebaseModule,
  AppLoggerModule,
  GuardsModule,
];

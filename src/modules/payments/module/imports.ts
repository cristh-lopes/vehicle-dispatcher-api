import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { FirebaseModule } from '@shared/core/firebase/firebase.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';
import { Payments } from '../database/entities/payments.entity';

export const paymentModuleImports = [
  EnvConfigModule,
  TypeOrmModule.forFeature([Payments]),
  FirebaseModule,
  AppLoggerModule,
  GuardsModule,
];

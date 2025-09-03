import { Clients } from '@clients/database/entities/clients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { FirebaseModule } from '@shared/core/firebase/firebase.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

export const clientModuleImports = [
  EnvConfigModule,
  TypeOrmModule.forFeature([Clients]),
  FirebaseModule,
  AppLoggerModule,
  GuardsModule,
];

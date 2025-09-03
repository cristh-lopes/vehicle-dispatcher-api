import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { FirebaseModule } from '@shared/core/firebase/firebase.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

import { User } from '@users/database/entities/user.entity';
import { DispatcherUser } from '@users/database/entities/dispatcher-user.entity';

export const userModuleImports = [
  EnvConfigModule,
  TypeOrmModule.forFeature([User, DispatcherUser]),
  FirebaseModule,
  AppLoggerModule,
  GuardsModule,
];

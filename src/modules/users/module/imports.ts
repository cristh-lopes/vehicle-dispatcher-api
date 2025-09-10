import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { FirebaseModule } from '@shared/core/firebase/firebase.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

import { User } from '@users/database/entities/user.entity';
import { DispatcherUser } from '@users/database/entities/dispatcher-user.entity';
import { forwardRef } from '@nestjs/common';
import { DispatchersModule } from '@dispatchers/dispatchers.module';

export const userModuleImports = [
  EnvConfigModule,
  TypeOrmModule.forFeature([User, DispatcherUser]),
  forwardRef(() => DispatchersModule),
  FirebaseModule,
  AppLoggerModule,
  GuardsModule,
];

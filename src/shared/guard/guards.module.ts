import { Module } from '@nestjs/common';

import { RolesGuard } from './roles.guard';
import { EnvConfigModule } from '../config/env';
import { FirebaseModule } from '../core/firebase';
import { AppLoggerModule } from '../core/logger';

@Module({
  imports: [EnvConfigModule, FirebaseModule, AppLoggerModule],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class GuardsModule {}

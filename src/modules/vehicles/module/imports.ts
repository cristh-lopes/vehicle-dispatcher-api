import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { FirebaseModule } from '@shared/core/firebase/firebase.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';
import { Vehicles } from '@vehicles/database/entities/vehicles.entity';

export const vehicleModuleImports = [
  EnvConfigModule,
  TypeOrmModule.forFeature([Vehicles]),
  FirebaseModule,
  AppLoggerModule,
  GuardsModule,
];

import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { CustomHttpModule } from '@shared/core/custom-http-module/custom-http.module';
import { FirebaseModule } from '@shared/core/firebase';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

import { Address } from '@addresses/database/entities/address.entity';
import { City } from '@addresses/database/entities/city.entity';

export const addressModuleImports = [
  TypeOrmModule.forFeature([Address, City]),
  CustomHttpModule,
  AppLoggerModule,
  EnvConfigModule,
  FirebaseModule,
  GuardsModule,
];

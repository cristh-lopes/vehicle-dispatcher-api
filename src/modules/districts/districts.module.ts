import { Module } from '@nestjs/common';

import {
  districtModuleControllers,
  districtModuleImports,
  districtModuleProviders,
} from './module';

@Module({
  imports: districtModuleImports,
  controllers: districtModuleControllers,
  providers: districtModuleProviders,
})
export class DistrictsModule {}

import { Module } from '@nestjs/common';
import { vehicleModuleControllers, vehicleModuleImports, vehicleModuleProviders } from './module';

@Module({
  imports: vehicleModuleImports,
  controllers: vehicleModuleControllers,
  providers: vehicleModuleProviders,
})
export class VehiclesModule {}

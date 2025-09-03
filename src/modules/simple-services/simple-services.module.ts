import { Module } from '@nestjs/common';
import {
  simpleServiceModuleControllers,
  simpleServiceModuleImports,
  simpleServiceModuleProviders,
} from './module';

@Module({
  imports: simpleServiceModuleImports,
  controllers: simpleServiceModuleControllers,
  providers: simpleServiceModuleProviders,
})
export class SimpleServicesModule {}

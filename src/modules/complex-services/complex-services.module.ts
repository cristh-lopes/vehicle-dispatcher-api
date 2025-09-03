import { Module } from '@nestjs/common';
import {
  complexServiceModuleControllers,
  complexServiceModuleImports,
  complexServiceModuleProviders,
} from './module';

@Module({
  imports: complexServiceModuleImports,
  controllers: complexServiceModuleControllers,
  providers: complexServiceModuleProviders,
})
export class ComplexServicesModule {}

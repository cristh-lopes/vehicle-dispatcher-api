import { Module } from '@nestjs/common';
import { clientModuleControllers, clientModuleImports, clientModuleProviders } from './module';

@Module({
  imports: clientModuleImports,
  controllers: clientModuleControllers,
  providers: clientModuleProviders,
})
export class ClientsModule {}

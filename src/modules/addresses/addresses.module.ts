import { Module } from '@nestjs/common';

import { addressModuleControllers, addressModuleImports, addressModuleProviders } from './module';

@Module({
  imports: addressModuleImports,
  controllers: addressModuleControllers,
  providers: addressModuleProviders,
})
export class AddressesModule {}

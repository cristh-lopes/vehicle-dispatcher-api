import { Module } from '@nestjs/common';

import {
  dispatcherModuleControllers,
  dispatcherModuleImports,
  dispatcherModuleProviders,
} from './module';

@Module({
  imports: dispatcherModuleImports,
  controllers: dispatcherModuleControllers,
  providers: dispatcherModuleProviders,
})
export class DispatchersModule {}

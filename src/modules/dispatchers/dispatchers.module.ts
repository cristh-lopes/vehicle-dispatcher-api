import { Module } from '@nestjs/common';

import {
  dispatcherModuleControllers,
  dispatcherModuleImports,
  dispatcherModuleProviders,
} from './module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatcher } from './database/entities/dispatcher.entity';

@Module({
  imports: dispatcherModuleImports,
  controllers: dispatcherModuleControllers,
  providers: dispatcherModuleProviders,
  exports: [TypeOrmModule.forFeature([Dispatcher])],
})
export class DispatchersModule {}

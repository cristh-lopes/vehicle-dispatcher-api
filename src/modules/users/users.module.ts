import { Module } from '@nestjs/common';

import { userModuleControllers, userModuleImports, userModuleProviders } from './module';

@Module({
  imports: userModuleImports,
  controllers: userModuleControllers,
  providers: userModuleProviders,
})
export class UsersModule {}

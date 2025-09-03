import { Module } from '@nestjs/common';
import { paymentModuleControllers, paymentModuleImports, paymentModuleProviders } from './module';

@Module({
  imports: paymentModuleImports,
  controllers: paymentModuleControllers,
  providers: paymentModuleProviders,
})
export class PaymentsModule {}

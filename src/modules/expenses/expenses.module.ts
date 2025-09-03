import { Module } from '@nestjs/common';
import { expenseModuleControllers, expenseModuleImports, expenseModuleProviders } from './module';

@Module({
  imports: expenseModuleImports,
  controllers: expenseModuleControllers,
  providers: expenseModuleProviders,
})
export class ExpensesModule {}

import { ExpensesTypes } from '@expenses/database/entities/expenses-types.entity';
import { Expenses } from '@expenses/database/entities/expenses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { FirebaseModule } from '@shared/core/firebase/firebase.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

export const expenseModuleImports = [
  EnvConfigModule,
  TypeOrmModule.forFeature([Expenses, ExpensesTypes]),
  FirebaseModule,
  AppLoggerModule,
  GuardsModule,
];

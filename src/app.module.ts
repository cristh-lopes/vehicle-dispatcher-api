import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from '@shared/config/env';
import { typeOrmConfig } from '@shared/config/typeorm.config';
import { CustomHttpModule } from '@shared/core/custom-http-module/custom-http.module';
import { AppLoggerModule } from '@shared/core/logger';
import { GuardsModule } from '@shared/guard/guards.module';

import { UsersModule } from '@users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressesModule } from '@addresses/addresses.module';
import { DistrictsModule } from './modules/districts/districts.module';
import { DispatchersModule } from './modules/dispatchers/dispatchers.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { SimpleServicesModule } from './modules/simple-services/simple-services.module';
import { ComplexServicesModule } from './modules/complex-services/complex-services.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@Module({
  imports: [
    EnvConfigModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomHttpModule,
    AppLoggerModule,
    UsersModule,
    AddressesModule,
    GuardsModule,
    DistrictsModule,
    DispatchersModule,
    PaymentsModule,
    ExpensesModule,
    SimpleServicesModule,
    ComplexServicesModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

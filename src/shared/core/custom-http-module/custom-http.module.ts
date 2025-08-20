import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomHttpService } from './custom-http.service';
import { AppLoggerModule } from '../logger';

@Module({
  imports: [HttpModule, AppLoggerModule],
  providers: [CustomHttpService],
  exports: [CustomHttpService],
})
export class CustomHttpModule {}

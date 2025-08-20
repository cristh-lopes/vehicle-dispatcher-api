import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfigParser, getEnvConfig } from './env.config';
import { envValidationSchema } from './env.schema';
import { EnvConfigService } from './env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getEnvConfig],
      validationSchema: EnvConfigParser.getNodeEnv() !== 'test' ? envValidationSchema : undefined,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}

import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../logger';
import { FirebaseAuthProvider } from './firebase-auth.provider';
import { FirebaseAppProvider } from './firebase.provider';
import { EnvConfigModule } from 'src/shared/config/env';

@Module({
  imports: [EnvConfigModule, AppLoggerModule],
  providers: [FirebaseAppProvider, FirebaseAuthProvider],
  exports: [FirebaseAppProvider, FirebaseAuthProvider],
})
export class FirebaseModule {}

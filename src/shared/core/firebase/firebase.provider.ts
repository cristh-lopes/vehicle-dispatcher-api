import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EnvConfigService } from '@shared/config/env';

@Injectable()
export class FirebaseAppProvider {
  private app: admin.app.App;

  constructor(private readonly envConfigService: EnvConfigService) {}

  private initializeApp() {
    const firebaseConfig = {
      type: this.envConfigService.get('firebase.type'),
      project_id: this.envConfigService.get('firebase.projectId'),
      private_key_id: this.envConfigService.get('firebase.privateKeyId'),
      private_key: this.envConfigService.get('firebase.privateKey'),
      client_email: this.envConfigService.get('firebase.clientEmail'),
      client_id: this.envConfigService.get('firebase.clientId'),
      auth_uri: this.envConfigService.get('firebase.authUri'),
      token_uri: this.envConfigService.get('firebase.tokenUri'),
      auth_provider_x509_cert_url: this.envConfigService.get('firebase.authCertUrl'),
      client_x509_cert_url: this.envConfigService.get('firebase.clientCertUrl'),
      universe_domain: this.envConfigService.get('firebase.universalDomain'),
    } as admin.ServiceAccount;

    this.app = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${this.envConfigService.get('firebase.projectId')}.firebaseio.com`,
      storageBucket: `${this.envConfigService.get('firebase.projectId')}.appspot.com`,
    });
  }

  getApp() {
    if (!this.app) {
      this.initializeApp();
    }

    return this.app;
  }
}

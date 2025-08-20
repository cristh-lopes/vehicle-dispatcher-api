import 'dotenv/config';

export abstract class EnvConfigParser {
  private static envs: NodeJS.ProcessEnv = process.env;

  public static getPort(): number | undefined {
    return Number(this.envs.PORT);
  }

  public static getNodeEnv(): string | undefined {
    return this.envs.NODE_ENV;
  }

  public static getDbHost(): string | undefined {
    return this.envs.DB_HOST;
  }

  public static getDbPort(): number | undefined {
    return Number(this.envs.DB_PORT);
  }

  public static getDbUser(): string | undefined {
    return this.envs.DB_USER;
  }

  public static getDbPass(): string | undefined {
    return this.envs.DB_PASS;
  }

  public static getDbName(): string | undefined {
    return this.envs.DB_NAME;
  }

  public static getFirebaseType(): string | undefined {
    return this.envs.FIREBASE_TYPE;
  }

  public static getFirebaseProjectId(): string | undefined {
    return this.envs.FIREBASE_PROJECT_ID;
  }

  public static getFirebasePrivateKeyId(): string | undefined {
    return this.envs.FIREBASE_PRIVATE_KEY_ID;
  }

  public static getFirebasePrivateKey(): string | undefined {
    return this.envs.FIREBASE_PRIVATE_KEY;
  }

  public static getFirebaseClientEmail(): string | undefined {
    return this.envs.FIREBASE_CLIENT_EMAIL;
  }

  public static getFirebaseClientId(): string | undefined {
    return this.envs.FIREBASE_CLIENT_ID;
  }

  public static getFirebaseAuthUri(): string | undefined {
    return this.envs.FIREBASE_AUTH_URI;
  }

  public static getFirebaseTokenUri(): string | undefined {
    return this.envs.FIREBASE_TOKEN_URI;
  }

  public static getFirebaseAuthCertUrl(): string | undefined {
    return this.envs.FIREBASE_AUTH_CERT_URL;
  }

  public static getFirebaseClientCertUrl(): string | undefined {
    return this.envs.FIREBASE_CLIENT_CERT_URL;
  }

  public static getFirebaseUniversalDomain(): string | undefined {
    return this.envs.FIREBASE_UNIVERSAL_DOMAIN;
  }

  public static getN8nApiKey(): string | undefined {
    return this.envs.N8N_API_KEY;
  }
}

export type EnvConfig = {
  port: number;
  nodeEnv: string;
  database: {
    host: string;
    port: number;
    user: string;
    pass: string;
    name: string;
  };
  firebase: {
    type: string;
    projectId: string;
    privateKeyId: string;
    privateKey: string;
    clientEmail: string;
    clientId: string;
    authUri: string;
    tokenUri: string;
    authCertUrl: string;
    clientCertUrl: string;
    universalDomain: string;
  };
  apiKeys: {
    n8n: string;
  };
};

export const getEnvConfig = (): EnvConfig => ({
  port: EnvConfigParser.getPort()!,
  nodeEnv: EnvConfigParser.getNodeEnv()!,
  database: {
    host: EnvConfigParser.getDbHost()!,
    port: EnvConfigParser.getDbPort()!,
    user: EnvConfigParser.getDbUser()!,
    pass: EnvConfigParser.getDbPass()!,
    name: EnvConfigParser.getDbName()!,
  },
  firebase: {
    type: EnvConfigParser.getFirebaseType()!,
    projectId: EnvConfigParser.getFirebaseProjectId()!,
    privateKeyId: EnvConfigParser.getFirebasePrivateKeyId()!,
    privateKey: EnvConfigParser.getFirebasePrivateKey()!,
    clientEmail: EnvConfigParser.getFirebaseClientEmail()!,
    clientId: EnvConfigParser.getFirebaseClientId()!,
    authUri: EnvConfigParser.getFirebaseAuthUri()!,
    tokenUri: EnvConfigParser.getFirebaseTokenUri()!,
    authCertUrl: EnvConfigParser.getFirebaseAuthCertUrl()!,
    clientCertUrl: EnvConfigParser.getFirebaseClientCertUrl()!,
    universalDomain: EnvConfigParser.getFirebaseUniversalDomain()!,
  },
  apiKeys: {
    n8n: EnvConfigParser.getN8nApiKey()!,
  },
});

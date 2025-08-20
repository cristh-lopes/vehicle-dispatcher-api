/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { LoggerService, Injectable, ConsoleLogger, Scope } from '@nestjs/common';
import chalk from 'chalk';
import errorToJSON from 'error-to-json';
import * as winston from 'winston';

type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'verbose';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger implements LoggerService {
  private logger: winston.Logger;

  constructor(contextApp?: string) {
    super();
    this.context = contextApp || 'Application';
    this.initLogger();
  }

  private initLogger() {
    const logFormat = winston.format.printf(
      ({ level, message }: { level: LogLevel; message: string }) => {
        const PidFormat = `${process.pid} -`;
        const levelColor = `${level.toUpperCase()}`;
        const contextAppFormat = chalk.yellow(`[${this.context}]`);

        let logMessage = `${PidFormat} ${super.getTimestamp()} ${levelColor} ${contextAppFormat} ${message}`;

        switch (level) {
          case 'info':
            logMessage = chalk.green(logMessage);
            break;
          case 'error':
            logMessage = chalk.red(logMessage);
            break;
          case 'warn':
            logMessage = chalk.yellow(logMessage);
            break;
          case 'debug':
            logMessage = chalk.magenta(logMessage);
            break;
          case 'verbose':
            logMessage = chalk.blueBright(logMessage);
            break;
          default:
            break;
        }

        return logMessage;
      },
    );

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.label({ label: 'nest' }),
        logFormat,
      ),
      transports: [new winston.transports.Console()],
    });
  }

  setContext(contextApp: string) {
    this.context = contextApp;
    this.initLogger();
  }

  log(message: string, data?: object, context?: string, ...optionalParams: unknown[]) {
    this.setContext(context ?? this.context ?? 'Application');
    const convertedData = data ? ` - ${JSON.stringify({ data })}` : '';
    const fullMessage = `${message}${convertedData}`;
    this.logger.info(fullMessage, ...optionalParams);
  }

  info(message: string, data?: object, context?: string, ...optionalParams: unknown[]) {
    this.setContext(context ?? this.context ?? 'Application');
    const convertedData = data ? ` - ${JSON.stringify({ data })}` : '';
    const fullMessage = `${message}${convertedData}`;
    this.logger.info(fullMessage, ...optionalParams);
  }

  error(
    message: string,
    data?: object,
    error?: unknown,
    context?: string,
    ...optionalParams: unknown[]
  ) {
    this.setContext(context ?? this.context ?? 'Application');

    const convertedData = data ? ` - ${JSON.stringify({ data })}` : '';
    const convertedError = error
      ? ` - ${JSON.stringify({ error: error instanceof Error ? errorToJSON(error) : error })}`
      : '';

    const fullMessage = `${message}${convertedData}${convertedError}`;
    this.logger.error(fullMessage, ...optionalParams);
  }

  warn(message: string, data?: object, context?: string, ...optionalParams: unknown[]) {
    this.setContext(context ?? this.context ?? 'Application');
    const convertedData = data ? ` - ${JSON.stringify({ data })}` : '';
    const fullMessage = `${message}${convertedData}`;
    this.logger.warn(fullMessage, ...optionalParams);
  }

  debug(message: string, data?: object, context?: string, ...optionalParams: unknown[]) {
    this.setContext(context ?? this.context ?? 'Application');
    const convertedData = data ? ` - ${JSON.stringify({ data })}` : '';
    const fullMessage = `${message}${convertedData}`;
    this.logger.debug(fullMessage, ...optionalParams);
  }

  verbose(message: string, data?: object, context?: string, ...optionalParams: unknown[]) {
    this.setContext(context ?? this.context ?? 'Application');
    const convertedData = data ? ` - ${JSON.stringify({ data })}` : '';
    const fullMessage = `${message}${convertedData}`;
    this.logger.verbose(fullMessage, ...optionalParams);
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AppLogger } from '../logger';

@Injectable()
export class CustomHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CustomHttpService.name);
  }

  /**
   * Executa uma requisição HTTP com tipagem segura
   */
  async request<T = unknown, D = unknown>(
    config: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.httpService.axiosRef.request<T, AxiosResponse<T>, D>(config);

      return response;
    } catch (err: unknown) {
      return this.handleError<T, D>(err, config);
    }
  }

  /**
   * Trata erros de forma segura, com tipagem correta e retorno padronizado
   */
  private handleError<T, D>(err: unknown, config: AxiosRequestConfig<D>): AxiosResponse<T> {
    if (this.isAxiosError<T>(err)) {
      const axiosError = err;

      this.logger.error('Request error', {
        params: config,
        message: axiosError.message,
        status: axiosError.response?.status,
      });

      // Se houver uma resposta vinda do servidor, retornamos ela
      if (axiosError.response) {
        return axiosError.response;
      }
    } else {
      this.logger.error('Unknown request error', {
        params: config,
        message: String(err),
      });
    }

    // Caso não haja resposta, criamos uma resposta padrão com status 500
    return {
      status: 500,
      statusText: 'Internal Server Error',
      config: config as InternalAxiosRequestConfig<D>,
      headers: {},
      data: {
        error: 'Internal server error',
      } as T,
    };
  }

  /**
   * Type Guard para verificar se o erro é um AxiosError
   */
  private isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return (
      typeof error === 'object' &&
      error !== null &&
      'isAxiosError' in error &&
      (error as AxiosError).isAxiosError === true
    );
  }
}

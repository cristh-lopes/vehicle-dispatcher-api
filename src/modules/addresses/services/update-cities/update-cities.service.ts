import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import axios from 'axios';

import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';
import { City } from '@addresses/database/entities/city.entity';

interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

interface IBGECity {
  id: number;
  nome: string;
}

@Injectable()
export class UpdateCitiesService extends TransactionHandler<{ stateUf: string }, void> {
  protected queryRunner: QueryRunner;

  constructor(
    dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(UpdateCitiesService.name);
  }

  protected async beforeTransactionExecute(): Promise<void> {}

  async execute(params: { stateUf: string }): Promise<void> {
    const uf = params.stateUf.toUpperCase();

    const { data: estados } = await axios.get<IBGEState[]>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    );

    const estado = estados.find((e) => e.sigla.toUpperCase() === uf);
    if (!estado) throw new NotFoundException(`Estado com a sigla ${uf} não encontrado no IBGE.`);

    const { data: cities } = await axios.get<IBGECity[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`,
    );

    for (const city of cities) {
      const cityName = city.nome.trim();

      const existingCity = await this.queryRunner.manager.findOne(City, {
        where: { name: cityName },
      });

      if (!existingCity) {
        const newCity = this.queryRunner.manager.create(City, {
          name: cityName,
          state: uf,
        });

        await this.queryRunner.manager.save(newCity);
        this.logger.log(`Cidade adicionada: ${cityName} (${uf})`);
      } else this.logger.debug(`Cidade já existe: ${cityName}`);
    }
  }

  protected async onError(error: Error, params: { stateUf: string }): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error(`Erro ao atualizar cidades do estado ${params.stateUf}`, { params }, error);
  }
}

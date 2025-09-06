import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Plan } from '@dispatchers/database/entities/plan.entity';
import { AppLogger } from '@shared/core/logger';
import { GetOnePlanResult, GetPlansResult } from './get-plans.dto';

@Injectable()
export class GetPlansService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(GetPlansService.name);
  }

  async getAll(): GetPlansResult {
    try {
      return await this.dataSource.manager.find(Plan);
    } catch (error: unknown) {
      this.handleError(error, 'Error fetching all plans');
    }
  }

  async getById(id: string): GetOnePlanResult {
    try {
      const plan = await this.dataSource.manager.findOne(Plan, { where: { id } });
      if (!plan) throw new NotFoundException(`Plan with id ${id} not found`);
      return plan;
    } catch (error: unknown) {
      this.handleError(error, `Error fetching plan with id ${id}`);
    }
  }

  private handleError(error: unknown, message: string): never {
    this.logger.error(message, error instanceof Error ? error : undefined);
    throw new InternalServerErrorException(message);
  }
}

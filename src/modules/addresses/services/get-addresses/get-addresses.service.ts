import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Address } from '@addresses/database/entities/address.entity';
import { AppLogger } from '@shared/core/logger';
import { GetOneAddressResult, GetAddressesResult } from './get-addresses.dto';

@Injectable()
export class GetAddressesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(GetAddressesService.name);
  }

  async getAll(): GetAddressesResult {
    try {
      return await this.dataSource.manager.find(Address);
    } catch (error: unknown) {
      this.handleError(error, 'Error fetching all addresses');
    }
  }

  async getById(id: string): GetOneAddressResult {
    try {
      const address = await this.dataSource.manager.findOne(Address, { where: { id } });
      if (!address) throw new NotFoundException(`Address with id ${id} not found`);
      return address;
    } catch (error: unknown) {
      this.handleError(error, `Error fetching address with id ${id}`);
    }
  }

  private handleError(error: unknown, message: string): never {
    this.logger.error(message, error instanceof Error ? error : undefined);
    throw new InternalServerErrorException(message);
  }
}

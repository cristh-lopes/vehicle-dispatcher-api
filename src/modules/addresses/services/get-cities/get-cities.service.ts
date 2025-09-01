import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from '@addresses/database/entities/city.entity';
import { CityResponseDTO } from './get-cities.dto';

@Injectable()
export class GetCitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async execute(state: string): Promise<CityResponseDTO[]> {
    const cities = await this.cityRepository.find({
      where: { state },
      order: { name: 'ASC' },
    });

    return cities.map((city) => ({
      id: city.id,
      name: city.name,
      state: city.state,
    }));
  }
}

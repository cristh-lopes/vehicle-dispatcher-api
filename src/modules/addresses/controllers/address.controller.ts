import { Controller, Get, Param, Patch } from '@nestjs/common';

import { GetCitiesValidationDTO } from '@addresses/controllers/validators/get-cities.dto';
import { GetCitiesService } from '@addresses/services/get-cities';
import { UpdateCitiesService } from '@addresses/services/update-cities';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly getCitiesService: GetCitiesService,
    private readonly updateCitiesService: UpdateCitiesService,
  ) {}

  @Get('cities/:state')
  async getCities(@Param() { state }: GetCitiesValidationDTO) {
    return this.getCitiesService.execute(state);
  }

  @Patch('cities/update/:state')
  async updateCities(@Param() { state }: GetCitiesValidationDTO) {
    await this.updateCitiesService.executeWithTransaction({ stateUf: state });
    return { message: `Cidades do estado ${state.toUpperCase()} atualizadas com sucesso.` };
  }
}

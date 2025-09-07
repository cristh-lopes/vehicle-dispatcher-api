import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { Roles, Role } from '@shared/guard/roles.decorator';
import { RolesGuard } from '@shared/guard/roles.guard';

import { CreateAddressService } from '@addresses/services/create-address/create-address.service';
import { CreateAddressValidatorDTO } from '@addresses/controllers/validators/create-address.dto';
import { GetCitiesValidationDTO } from '@addresses/controllers/validators/get-cities.dto';
import { GetCitiesService } from '@addresses/services/get-cities';
import { UpdateCitiesService } from '@addresses/services/update-cities';
import { GetAddressesService } from '@addresses/services/get-addresses';
import { GetByIdValidationDTO } from '@dispatchers/controllers/validators/get-by-id.dto';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly createAddressService: CreateAddressService,
    private readonly getCitiesService: GetCitiesService,
    private readonly getAddressesService: GetAddressesService,
    private readonly updateCitiesService: UpdateCitiesService,
  ) {}

  @Post()
  @Roles(Role.user)
  @UseGuards(RolesGuard)
  async createAddress(
    @Headers() headers: Record<string, string>,
    @Body() params: CreateAddressValidatorDTO,
  ) {
    const userId: string | undefined = headers['user-id'];

    if (!userId) {
      throw new UnauthorizedException('User id not found in token');
    }

    return this.createAddressService.executeWithTransaction(params);
  }

  @Get()
  @UseGuards(RolesGuard)
  async getAddresses() {
    return this.getAddressesService.getAll();
  }

  @Get(':id')
  @Roles(Role.user)
  async getById(@Param() { id }: GetByIdValidationDTO) {
    return this.getAddressesService.getById(id);
  }

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

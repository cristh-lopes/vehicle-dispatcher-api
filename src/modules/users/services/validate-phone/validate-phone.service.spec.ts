import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { AppLogger } from '@shared/core/logger';
import { appLoggerMock } from '@shared/mocks/logger.mock';
import { dataSourceMock, queryRunnerMock } from '@shared/mocks/typeorm.mock';

import { User } from '@users/database/entities/user.entity';

import { ValidatePhoneParams, ValidatePhoneService } from '.';

describe('ValidatePhoneService', () => {
  let sut: ValidatePhoneService;

  const userMock = {
    id: 'any_user_id',
    name: 'any_name',
    email: 'any_email',
    phone: 'any_phone',
    password: 'any_password',
    phoneValidationCode: '123456',
    phoneValidated: false,
  } as unknown as User;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ValidatePhoneService,
        { provide: DataSource, useValue: dataSourceMock },
        {
          provide: AppLogger,
          useValue: appLoggerMock,
        },
      ],
    }).compile();

    sut = await module.resolve(ValidatePhoneService);

    queryRunnerMock.manager.findOneBy.mockResolvedValue(userMock);
  });

  const params: ValidatePhoneParams = {
    phone: 'any_phone',
    validationCode: '123456',
  };

  test('should call queryRunner.manager.findOneBy to find user by phone and validation code', async () => {
    await sut.executeWithTransaction(params);

    expect(queryRunnerMock.manager.findOneBy).toHaveBeenCalledWith(User, {
      phone: params.phone,
      phoneValidationCode: params.validationCode,
    });
  });

  test('should throw BadRequestException if user not found', async () => {
    queryRunnerMock.manager.findOneBy.mockResolvedValueOnce(null);

    await expect(sut.executeWithTransaction(params)).rejects.toThrow(
      new BadRequestException('Invalid code'),
    );
  });

  test('should throw BadRequestException if phone already validated', async () => {
    queryRunnerMock.manager.findOneBy.mockResolvedValueOnce({ ...userMock, phoneValidated: true });

    await expect(sut.executeWithTransaction(params)).rejects.toThrow(
      new BadRequestException('Phone already validated'),
    );
  });

  test('should call update to set phoneValidated to true', async () => {
    await sut.executeWithTransaction(params);

    expect(queryRunnerMock.manager.update).toHaveBeenCalledWith(
      User,
      { id: userMock.id },
      { phoneValidated: true },
    );
  });

  test('should return success message when phone validation is successful', async () => {
    const result = await sut.executeWithTransaction(params);

    expect(result).toEqual({ message: 'Phone validated successfully' });
  });

  test('should log error when transaction fails', async () => {
    const error = new Error('Database error');
    queryRunnerMock.manager.findOneBy.mockRejectedValueOnce(error);

    await expect(sut.executeWithTransaction(params)).rejects.toThrow(error);

    expect(appLoggerMock.error).toHaveBeenCalledWith(
      'Error on phone validation',
      { params },
      error,
    );
  });
});

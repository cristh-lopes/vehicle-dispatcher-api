import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { repositoryMock } from '@shared/mocks/typeorm.mock';

import { User } from '@users/database/entities/user.entity';

import { GetUserParams } from './associate-user.dto';
import { GetUserService } from './associate-user.service';

describe('GetUserService', () => {
  let sut: GetUserService;

  const userMock = {
    id: 'any_user_id',
    name: 'any_name',
    email: 'any_email@example.com',
    phone: '+1234567890',
    phoneValidated: true,
    phoneValidationCode: '123456',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    sut = await module.resolve(GetUserService);

    repositoryMock.findOne.mockResolvedValue(userMock);
  });

  test('should throw BadRequestException when no params are provided', async () => {
    const params: GetUserParams = {};

    await expect(sut.execute(params)).rejects.toThrow(new BadRequestException('Invalid params'));
  });

  test('should call userRepository.findOne with correct params', async () => {
    const params: GetUserParams = { id: userMock.id };

    await sut.execute(params);

    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: userMock.id } });
  });

  test('should throw NotFoundException when user is not found', async () => {
    repositoryMock.findOne.mockResolvedValueOnce(null);

    const params: GetUserParams = { id: 'non_existing_id' };

    await expect(sut.execute(params)).rejects.toThrow(new NotFoundException('User not found'));
  });

  test('should return user when id is provided', async () => {
    const params: GetUserParams = { id: userMock.id };

    const result = await sut.execute(params);

    expect(result).toEqual({
      id: userMock.id,
      name: userMock.name,
      email: userMock.email,
      phone: userMock.phone,
      phoneValidated: userMock.phoneValidated,
    });
  });

  test('should return user when phone is provided', async () => {
    const params: GetUserParams = { phone: userMock.phone };

    const result = await sut.execute(params);

    expect(result).toEqual({
      id: userMock.id,
      name: userMock.name,
      email: userMock.email,
      phone: userMock.phone,
      phoneValidated: userMock.phoneValidated,
    });
  });

  test('should return user when email is provided', async () => {
    const params: GetUserParams = { email: userMock.email };

    const result = await sut.execute(params);

    expect(result).toEqual({
      id: userMock.id,
      name: userMock.name,
      email: userMock.email,
      phone: userMock.phone,
      phoneValidated: userMock.phoneValidated,
    });
  });
});

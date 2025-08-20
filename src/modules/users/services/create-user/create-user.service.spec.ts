import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { Failure, Success } from '@shared/core/either';
import { FirebaseAuthProvider } from '@shared/core/firebase';
import { AppLogger } from '@shared/core/logger';
import { firebaseAuthProviderMock } from '@shared/mocks/firebase-app.mock';
import { appLoggerMock } from '@shared/mocks/logger.mock';
import { dataSourceMock, queryRunnerMock } from '@shared/mocks/typeorm.mock';

import { User } from '@users/database/entities/user.entity';

import { CreateUserParams, CreateUserService } from '.';

describe('CreateUserService', () => {
  let sut: CreateUserService;

  const userMock = {
    id: 'any_user_id',
    name: 'any_name',
    email: 'any_email',
    phone: 'any_phone',
    password: 'any_password',
    phoneValidationCode: '123456',
  } as unknown as User;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: DataSource, useValue: dataSourceMock },
        {
          provide: AppLogger,
          useValue: appLoggerMock,
        },
        {
          provide: FirebaseAuthProvider,
          useValue: firebaseAuthProviderMock,
        },
      ],
    }).compile();

    sut = await module.resolve(CreateUserService);

    queryRunnerMock.manager.create.mockReturnValue(userMock);
    firebaseAuthProviderMock.createUser.mockReturnValue(Success.create(userMock));
  });

  const params: CreateUserParams = {
    name: 'any_name',
    email: 'any_email',
    phone: 'any_phone',
    password: 'any_password',
  };

  test('should call queryRunner.manager.findOne to find an user by email', async () => {
    await sut.executeWithTransaction(params);

    expect(queryRunnerMock.manager.findOneBy).toHaveBeenCalledWith(User, { email: params.email });
  });

  test('should throw if user already exists', async () => {
    jest.spyOn(queryRunnerMock.manager, 'findOneBy').mockResolvedValueOnce(userMock);

    await expect(sut.executeWithTransaction(params)).rejects.toThrow(
      new ConflictException('User already exists'),
    );
  });

  test('should call queryRunner.manager.create to create a new user with phone validation code', async () => {
    await sut.executeWithTransaction(params);

    expect(queryRunnerMock.manager.create).toHaveBeenCalledWith(User, {
      ...params,
      phoneValidationCode: expect.stringMatching(/^\d{6}$/) as unknown as string,
    });
    expect(queryRunnerMock.manager.save).toHaveBeenCalledWith(userMock);
  });

  test('should generate a 6-digit phone validation code', async () => {
    const createSpy = jest.spyOn(queryRunnerMock.manager, 'create');

    await sut.executeWithTransaction(params);

    expect(createSpy).toHaveBeenCalledWith(
      User,
      expect.objectContaining({
        phoneValidationCode: expect.stringMatching(/^\d{6}$/) as unknown as string,
      }),
    );

    const callArgs = createSpy.mock.calls[0][1] as { phoneValidationCode: string };
    expect(callArgs.phoneValidationCode).toHaveLength(6);
    expect(Number(callArgs.phoneValidationCode)).toBeGreaterThanOrEqual(100000);
    expect(Number(callArgs.phoneValidationCode)).toBeLessThanOrEqual(999999);
  });

  test('should generate different phone validation codes for different calls', async () => {
    const createSpy = jest.spyOn(queryRunnerMock.manager, 'create');

    await sut.executeWithTransaction(params);
    await sut.executeWithTransaction({ ...params, email: 'another_email' });

    const firstCall = createSpy.mock.calls[0][1] as { phoneValidationCode: string };
    const secondCall = createSpy.mock.calls[1][1] as { phoneValidationCode: string };

    expect(firstCall.phoneValidationCode).not.toBe(secondCall.phoneValidationCode);
  });

  test('should call firebase app to create a new user', async () => {
    await sut.executeWithTransaction(params);

    expect(firebaseAuthProviderMock.createUser).toHaveBeenCalledWith({
      uid: userMock.id,
      email: params.email,
      password: params.password,
      displayName: params.name,
      phoneNumber: params.phone,
    });
  });

  test('should throw if firebase user creation fails', async () => {
    const error = new ConflictException('Email already exists');

    jest.spyOn(firebaseAuthProviderMock, 'createUser').mockReturnValueOnce(Failure.create(error));

    await expect(sut.executeWithTransaction(params)).rejects.toThrow(error);
  });

  test('should log user creation', async () => {
    const logSpy = jest.spyOn(appLoggerMock, 'log');
    await sut.executeWithTransaction(params);
    expect(logSpy).toHaveBeenCalledWith('User created', {
      id: userMock.id,
      email: params.email,
      phone: params.phone,
    });
  });

  test('should return the created user', async () => {
    const result = await sut.executeWithTransaction(params);

    expect(result).toEqual(userMock);
  });
});

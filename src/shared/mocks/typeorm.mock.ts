import { DataSource } from 'typeorm';

export const repositoryMock = {
  find: jest.fn(),
  findBy: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  findAndCount: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
};

export const queryRunnerMock = {
  manager: repositoryMock,
  connect: jest.fn(),
  startTransaction: jest.fn(),
  release: jest.fn(),
  rollbackTransaction: jest.fn(),
  commitTransaction: jest.fn(),
};

export const dataSourceMock = {
  createQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
} as unknown as DataSource;

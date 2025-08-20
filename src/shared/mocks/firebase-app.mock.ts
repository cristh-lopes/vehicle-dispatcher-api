export const firebaseAppMock = {
  auth: jest.fn().mockReturnValue({ createUser: jest.fn() }),
};

export const firebaseAuthProviderMock = {
  createUser: jest.fn(),
};

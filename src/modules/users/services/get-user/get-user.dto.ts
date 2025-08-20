export type GetUserParams = {
  id?: string;
  phone?: string;
  email?: string;
};

export type GetUserResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneValidated: boolean;
} | null;

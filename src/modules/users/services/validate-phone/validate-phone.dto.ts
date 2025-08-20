export type ValidatePhoneParams = {
  phone: string;
  validationCode: string;
};

export type ValidatePhoneResult = {
  message: string;
};

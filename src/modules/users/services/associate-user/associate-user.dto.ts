// associate-user.dto.ts

export interface DispatcherDTO {
  id: string;
  name: string;
  signatureDate: Date;
  document: string;
}

export interface DispatcherUserDTO {
  id: string;
  role: string; // ou UserRole se quiser tipar com enum
  permitions?: string[];
  dispatcher: DispatcherDTO | null;
}

export interface AssociateUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneValidated: boolean;
  dispatcherUsers?: DispatcherUserDTO[];
}

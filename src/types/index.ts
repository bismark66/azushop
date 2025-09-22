export type ApiErrorDetail = {
  [key: string]: any;
};

export type ApiError = {
  error: {
    code: string;
    message: string;
  };
  details?: ApiErrorDetail;
};

export type SignUpType = {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  location?: string;
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  username?: string;
  isAdmin?: boolean;
}

export type changePasswordType = {
  oldPassword: string;
  newPassword: string;
};

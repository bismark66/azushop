export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  contact_number: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  };
  accessToken: string;
}

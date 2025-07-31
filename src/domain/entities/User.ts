export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser extends User {
  token: string;
  refreshToken: string;
}

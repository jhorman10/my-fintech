import type { User, AuthUser } from '../entities/User';

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthUser>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthUser>;
  getCurrentUser(): Promise<User | null>;
  register(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }
  ): Promise<AuthUser>;
}

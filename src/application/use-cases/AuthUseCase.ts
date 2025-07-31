import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { AuthUser, User } from '../../domain/entities/User';

export class AuthUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async login(email: string, password: string): Promise<AuthUser> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return await this.authRepository.login(email, password);
  }

  async logout(): Promise<void> {
    return await this.authRepository.logout();
  }

  async getCurrentUser(): Promise<User | null> {
    return await this.authRepository.getCurrentUser();
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone?: string;
  }): Promise<AuthUser> {
    if (!userData.email || !userData.password || !userData.name || !userData.lastName) {
      throw new Error('Required fields are missing');
    }

    return await this.authRepository.register(userData);
  }
}

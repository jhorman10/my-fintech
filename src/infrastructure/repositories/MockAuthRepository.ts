import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { User, AuthUser } from '../../domain/entities/User';
import { mockUsers } from '../../data/mockUsers';

export class MockAuthRepository implements AuthRepository {
  private currentUser: AuthUser | null = null;

  async login(email: string, password: string): Promise<AuthUser> {
    // Simulamos autenticación
    const user = mockUsers.find(u => u.email === email);

    if (!user || password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    const authUser: AuthUser = {
      ...user,
      token: `token-${user.id}-${Date.now()}`,
      refreshToken: `refresh-${user.id}-${Date.now()}`,
    };

    this.currentUser = authUser;
    localStorage.setItem('authUser', JSON.stringify(authUser));

    return authUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('authUser');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshToken(_refreshToken: string): Promise<AuthUser> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    const newAuthUser: AuthUser = {
      ...this.currentUser,
      token: `token-${this.currentUser.id}-${Date.now()}`,
      refreshToken: `refresh-${this.currentUser.id}-${Date.now()}`,
    };

    this.currentUser = newAuthUser;
    localStorage.setItem('authUser', JSON.stringify(newAuthUser));

    return newAuthUser;
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }

    return null;
  }

  async register(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }
  ): Promise<AuthUser> {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      lastName: userData.lastName,
      phone: userData.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const authUser: AuthUser = {
      ...newUser,
      token: `token-${newUser.id}-${Date.now()}`,
      refreshToken: `refresh-${newUser.id}-${Date.now()}`,
    };

    this.currentUser = authUser;
    localStorage.setItem('authUser', JSON.stringify(authUser));

    return authUser;
  }
}

import { useState, useEffect } from 'react';
import type { User } from '../../domain/entities/User';
import { AuthUseCase } from '../../application/use-cases/AuthUseCase';
import { MockAuthRepository } from '../../infrastructure/repositories/MockAuthRepository';

const authRepository = new MockAuthRepository();
const authUseCase = new AuthUseCase(authRepository);

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      setLoading(true);
      const currentUser = await authUseCase.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error checking user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const authUser = await authUseCase.login(email, password);
      setUser(authUser);
      return authUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authUseCase.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const authUser = await authUseCase.register(userData);
      setUser(authUser);
      return authUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
};

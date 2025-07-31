import type { User } from '../domain/entities/User';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'juan.perez@email.com',
    name: 'Juan',
    lastName: 'Pérez',
    phone: '+57 300 123 4567',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    email: 'maria.garcia@email.com',
    name: 'María',
    lastName: 'García',
    phone: '+57 310 987 6543',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-11-15'),
  },
];

export const defaultUser = mockUsers[0];

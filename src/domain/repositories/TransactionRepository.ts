import type { Transaction, TransactionFilter } from '../entities/Transaction';

export interface TransactionRepository {
  getUserTransactions(userId: string, filter?: TransactionFilter): Promise<Transaction[]>;
  getTransactionById(transactionId: string): Promise<Transaction | null>;
  getRecentTransactions(userId: string, limit?: number): Promise<Transaction[]>;
  createTransaction(transactionData: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction>;
}

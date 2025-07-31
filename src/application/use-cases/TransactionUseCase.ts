import type { TransactionRepository } from '../../domain/repositories/TransactionRepository';
import type { Transaction, TransactionFilter } from '../../domain/entities/Transaction';

export class TransactionUseCase {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async getUserTransactions(userId: string, filter?: TransactionFilter): Promise<Transaction[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.transactionRepository.getUserTransactions(userId, filter);
  }

  async getRecentTransactions(userId: string, limit: number = 10): Promise<Transaction[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.transactionRepository.getRecentTransactions(userId, limit);
  }

  async getTransactionById(transactionId: string): Promise<Transaction | null> {
    if (!transactionId) {
      throw new Error('Transaction ID is required');
    }

    return await this.transactionRepository.getTransactionById(transactionId);
  }
}

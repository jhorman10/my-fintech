import type { TransactionRepository } from '../../domain/repositories/TransactionRepository';
import type { Transaction, TransactionFilter } from '../../domain/entities/Transaction';
import { mockTransactions } from '../../data/mockTransactions';

export class MockTransactionRepository implements TransactionRepository {
  async getUserTransactions(userId: string, filter?: TransactionFilter): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let transactions = mockTransactions.filter(transaction => transaction.userId === userId);

    if (filter) {
      if (filter.type) {
        transactions = transactions.filter(t => t.type === filter.type);
      }
      if (filter.status) {
        transactions = transactions.filter(t => t.status === filter.status);
      }
      if (filter.creditId) {
        transactions = transactions.filter(t => t.creditId === filter.creditId);
      }
      if (filter.dateFrom) {
        transactions = transactions.filter(t => t.date >= filter.dateFrom!);
      }
      if (filter.dateTo) {
        transactions = transactions.filter(t => t.date <= filter.dateTo!);
      }
      if (filter.description) {
        transactions = transactions.filter(t =>
          t.description.toLowerCase().includes(filter.description!.toLowerCase())
        );
      }
    }

    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getTransactionById(transactionId: string): Promise<Transaction | null> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockTransactions.find(transaction => transaction.id === transactionId) || null;
  }

  async getRecentTransactions(userId: string, limit: number = 10): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const userTransactions = mockTransactions
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    return userTransactions.slice(0, limit);
  }

  async createTransaction(
    transactionData: Omit<Transaction, 'id' | 'createdAt'>
  ): Promise<Transaction> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const newTransaction: Transaction = {
      ...transactionData,
      id: `trans-${Date.now()}`,
      createdAt: new Date(),
    };

    mockTransactions.push(newTransaction);

    return newTransaction;
  }
}

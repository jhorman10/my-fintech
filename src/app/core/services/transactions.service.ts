import { useState, useEffect } from 'react';
import type { Transaction, TransactionFilter } from '../../../domain/entities/Transaction';
import { TransactionUseCase } from '../../../application/use-cases/TransactionUseCase';
import { MockTransactionRepository } from '../../../infrastructure/repositories/MockTransactionRepository';

const transactionRepository = new MockTransactionRepository();
const transactionUseCase = new TransactionUseCase(transactionRepository);

export const useTransactions = (userId: string | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async (filter?: TransactionFilter) => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const userTransactions = await transactionUseCase.getUserTransactions(userId, filter);
      setTransactions(userTransactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading transactions');
    } finally {
      setLoading(false);
    }
  };

  const loadRecentTransactions = async (limit: number = 10) => {
    if (!userId) return;

    try {
      const recent = await transactionUseCase.getRecentTransactions(userId, limit);
      setRecentTransactions(recent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading recent transactions');
    }
  };

  useEffect(() => {
    if (userId) {
      loadRecentTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getTransactionById = async (transactionId: string) => {
    try {
      return await transactionUseCase.getTransactionById(transactionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading transaction');
      return null;
    }
  };

  return {
    transactions,
    recentTransactions,
    loading,
    error,
    loadTransactions,
    loadRecentTransactions,
    getTransactionById,
  };
};

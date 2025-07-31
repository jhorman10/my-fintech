import { useState, useEffect } from 'react';
import type { Credit, CreditSummary } from '../../../domain/entities/Credit';
import { CreditUseCase } from '../../../application/use-cases/CreditUseCase';
import { MockCreditRepository } from '../../../infrastructure/repositories/MockCreditRepository';

const creditRepository = new MockCreditRepository();
const creditUseCase = new CreditUseCase(creditRepository);

export const useCredits = (userId: string | null) => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [summary, setSummary] = useState<CreditSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCredits = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const userCredits = await creditUseCase.getUserCredits(userId);
      setCredits(userCredits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading credits');
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    if (!userId) return;

    try {
      const creditSummary = await creditUseCase.getCreditSummary(userId);
      setSummary(creditSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading summary');
    }
  };

  useEffect(() => {
    if (userId) {
      loadCredits();
      loadSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getCreditById = async (creditId: string) => {
    try {
      return await creditUseCase.getCreditById(creditId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading credit');
      return null;
    }
  };

  return {
    credits,
    summary,
    loading,
    error,
    loadCredits,
    loadSummary,
    getCreditById,
  };
};

import type { Credit, CreditSummary } from '../entities/Credit';

export interface CreditRepository {
  getUserCredits(userId: string): Promise<Credit[]>;
  getCreditById(creditId: string): Promise<Credit | null>;
  getCreditSummary(userId: string): Promise<CreditSummary>;
  updateCredit(creditId: string, updateData: Partial<Credit>): Promise<Credit>;
}

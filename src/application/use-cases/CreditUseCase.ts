import type { CreditRepository } from '../../domain/repositories/CreditRepository';
import type { Credit, CreditSummary } from '../../domain/entities/Credit';

export class CreditUseCase {
  private creditRepository: CreditRepository;

  constructor(creditRepository: CreditRepository) {
    this.creditRepository = creditRepository;
  }

  async getUserCredits(userId: string): Promise<Credit[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.creditRepository.getUserCredits(userId);
  }

  async getCreditSummary(userId: string): Promise<CreditSummary> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.creditRepository.getCreditSummary(userId);
  }

  async getCreditById(creditId: string): Promise<Credit | null> {
    if (!creditId) {
      throw new Error('Credit ID is required');
    }

    return await this.creditRepository.getCreditById(creditId);
  }
}

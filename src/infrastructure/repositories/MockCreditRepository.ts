import type { CreditRepository } from '../../domain/repositories/CreditRepository';
import type { Credit, CreditSummary } from '../../domain/entities/Credit';
import { mockCredits } from '../../data/mockCredits';

export class MockCreditRepository implements CreditRepository {
  async getUserCredits(userId: string): Promise<Credit[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockCredits.filter(credit => credit.userId === userId);
  }

  async getCreditById(creditId: string): Promise<Credit | null> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockCredits.find(credit => credit.id === creditId) || null;
  }

  async getCreditSummary(userId: string): Promise<CreditSummary> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const userCredits = mockCredits.filter(
      credit => credit.userId === userId && credit.status === 'ACTIVE'
    );

    if (userCredits.length === 0) {
      return {
        totalCredits: 0,
        totalDebt: 0,
        totalOriginalAmount: 0,
        averageInterestRate: 0,
        nextPaymentDate: null,
      };
    }

    const totalDebt = userCredits.reduce((sum, credit) => sum + credit.currentBalance, 0);
    const totalOriginalAmount = userCredits.reduce((sum, credit) => sum + credit.originalAmount, 0);
    const averageInterestRate =
      userCredits.reduce((sum, credit) => sum + credit.interestRate, 0) / userCredits.length;
    const nextPaymentDate = userCredits
      .map(credit => credit.nextPaymentDate)
      .sort((a, b) => a.getTime() - b.getTime())[0];

    return {
      totalCredits: userCredits.length,
      totalDebt,
      totalOriginalAmount,
      averageInterestRate,
      nextPaymentDate,
    };
  }

  async updateCredit(creditId: string, updateData: Partial<Credit>): Promise<Credit> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const creditIndex = mockCredits.findIndex(credit => credit.id === creditId);

    if (creditIndex === -1) {
      throw new Error('Credit not found');
    }

    const updatedCredit = {
      ...mockCredits[creditIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    mockCredits[creditIndex] = updatedCredit;

    return updatedCredit;
  }
}

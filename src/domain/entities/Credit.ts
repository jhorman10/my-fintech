export type CreditType = 'MORTGAGE' | 'CAR_LOAN' | 'CREDIT_CARD' | 'PERSONAL_LOAN';
export type CreditStatus = 'ACTIVE' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface Credit {
  id: string;
  userId: string;
  type: CreditType;
  name: string;
  originalAmount: number;
  currentBalance: number;
  interestRate: number;
  nextPaymentDate: Date;
  monthlyPayment: number;
  status: CreditStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditSummary {
  totalCredits: number;
  totalDebt: number;
  totalOriginalAmount: number;
  averageInterestRate: number;
  nextPaymentDate: Date | null;
}

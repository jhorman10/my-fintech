export type ProductType = 'CREDIT_CARD' | 'PERSONAL_LOAN' | 'MORTGAGE' | 'CAR_LOAN';

export interface FinancialProduct {
  id: string;
  type: ProductType;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  term: number; // months
  requirements: string[];
  benefits: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface CreditApplication {
  id: string;
  userId: string;
  productId: string;
  requestedAmount: number;
  term: number;
  monthlyIncome: number;
  purpose: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';
  createdAt: Date;
  updatedAt: Date;
}

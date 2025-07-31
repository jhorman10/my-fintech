import type { FinancialProduct, CreditApplication } from '../entities/Product';

export interface ProductRepository {
  getAvailableProducts(): Promise<FinancialProduct[]>;
  getProductById(productId: string): Promise<FinancialProduct | null>;
  submitCreditApplication(
    applicationData: Omit<CreditApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<CreditApplication>;
  getUserApplications(userId: string): Promise<CreditApplication[]>;
}

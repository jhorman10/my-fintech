import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { FinancialProduct, CreditApplication } from '../../domain/entities/Product';

export class ProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async getAvailableProducts(): Promise<FinancialProduct[]> {
    return await this.productRepository.getAvailableProducts();
  }

  async getProductById(productId: string): Promise<FinancialProduct | null> {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    return await this.productRepository.getProductById(productId);
  }

  async submitCreditApplication(applicationData: {
    userId: string;
    productId: string;
    requestedAmount: number;
    term: number;
    monthlyIncome: number;
    purpose: string;
  }): Promise<CreditApplication> {
    const { userId, productId, requestedAmount, term, monthlyIncome, purpose } = applicationData;

    if (!userId || !productId || !requestedAmount || !term || !monthlyIncome || !purpose) {
      throw new Error('All application fields are required');
    }

    if (requestedAmount <= 0) {
      throw new Error('Requested amount must be greater than 0');
    }

    if (term <= 0) {
      throw new Error('Term must be greater than 0');
    }

    if (monthlyIncome <= 0) {
      throw new Error('Monthly income must be greater than 0');
    }

    return await this.productRepository.submitCreditApplication({
      userId,
      productId,
      requestedAmount,
      term,
      monthlyIncome,
      purpose,
    });
  }

  async getUserApplications(userId: string): Promise<CreditApplication[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.productRepository.getUserApplications(userId);
  }
}

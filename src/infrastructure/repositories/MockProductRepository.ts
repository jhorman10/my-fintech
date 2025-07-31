import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { FinancialProduct, CreditApplication } from '../../domain/entities/Product';
import { mockProducts } from '../../data/mockProducts';

const mockApplications: CreditApplication[] = [];

export class MockProductRepository implements ProductRepository {
  async getAvailableProducts(): Promise<FinancialProduct[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    return mockProducts.filter(product => product.isActive);
  }

  async getProductById(productId: string): Promise<FinancialProduct | null> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockProducts.find(product => product.id === productId) || null;
  }

  async submitCreditApplication(
    applicationData: Omit<CreditApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<CreditApplication> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newApplication: CreditApplication = {
      ...applicationData,
      id: `app-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockApplications.push(newApplication);

    return newApplication;
  }

  async getUserApplications(userId: string): Promise<CreditApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockApplications
      .filter(application => application.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

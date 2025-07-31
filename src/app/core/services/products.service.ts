import { useState, useEffect } from 'react';
import type { FinancialProduct } from '../../../domain/entities/Product';
import { ProductUseCase } from '../../../application/use-cases/ProductUseCase';
import { MockProductRepository } from '../../../infrastructure/repositories/MockProductRepository';

const productRepository = new MockProductRepository();
const productUseCase = new ProductUseCase(productRepository);

export const useProducts = () => {
  const [products, setProducts] = useState<FinancialProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const availableProducts = await productUseCase.getAvailableProducts();
      setProducts(availableProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (productId: string) => {
    try {
      return await productUseCase.getProductById(productId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading product');
      return null;
    }
  };

  const submitApplication = async (applicationData: {
    userId: string;
    productId: string;
    requestedAmount: number;
    term: number;
    monthlyIncome: number;
    purpose: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const application = await productUseCase.submitCreditApplication(applicationData);
      return application;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error submitting application';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    submitApplication,
  };
};

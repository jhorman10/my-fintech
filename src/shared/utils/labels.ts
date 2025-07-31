import type { CreditType } from '../../domain/entities/Credit';
import type { TransactionType } from '../../domain/entities/Transaction';
import type { ProductType } from '../../domain/entities/Product';

export const getCreditTypeLabel = (type: CreditType): string => {
  const labels: Record<CreditType, string> = {
    MORTGAGE: 'Hipoteca',
    CAR_LOAN: 'Préstamo Vehículo',
    CREDIT_CARD: 'Tarjeta de Crédito',
    PERSONAL_LOAN: 'Préstamo Personal',
  };
  return labels[type];
};

export const getTransactionTypeLabel = (type: TransactionType): string => {
  const labels: Record<TransactionType, string> = {
    PAYMENT: 'Pago',
    DISBURSEMENT: 'Desembolso',
    INTEREST_CHARGE: 'Cargo por Intereses',
    FEE: 'Comisión',
  };
  return labels[type];
};

export const getProductTypeLabel = (type: ProductType): string => {
  const labels: Record<ProductType, string> = {
    CREDIT_CARD: 'Tarjeta de Crédito',
    PERSONAL_LOAN: 'Préstamo Personal',
    MORTGAGE: 'Hipoteca',
    CAR_LOAN: 'Préstamo Vehículo',
  };
  return labels[type];
};

export const getTransactionTypeColor = (type: TransactionType): string => {
  const colors: Record<TransactionType, string> = {
    PAYMENT: 'text-green-600',
    DISBURSEMENT: 'text-blue-600',
    INTEREST_CHARGE: 'text-red-600',
    FEE: 'text-orange-600',
  };
  return colors[type];
};

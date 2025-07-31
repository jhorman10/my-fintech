export type TransactionType = 'PAYMENT' | 'DISBURSEMENT' | 'INTEREST_CHARGE' | 'FEE';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export interface Transaction {
  id: string;
  userId: string;
  creditId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  status: TransactionStatus;
  referenceNumber?: string;
  balanceAfter: number;
  createdAt: Date;
}

export interface TransactionFilter {
  type?: TransactionType;
  status?: TransactionStatus;
  dateFrom?: Date;
  dateTo?: Date;
  creditId?: string;
  description?: string;
}

export interface Transaction {
  id: number;
  created_at: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export type TransactionType = 'income' | 'expense';

export interface TransactionFormData {
  description: string;
  amount: string;
  type: TransactionType;
}

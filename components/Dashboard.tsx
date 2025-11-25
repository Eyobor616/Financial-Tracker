import React, { useMemo } from 'react';
import { Transaction } from '../types';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ transactions, isLoading }) => {
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const balance = income - expense;

    return { income, expense, balance };
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      {/* Total Balance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Total Balance</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(stats.balance)}
          </h2>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Wallet className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Income */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Total Income</p>
          <h2 className="text-2xl font-bold text-green-600 mt-1">
            {formatCurrency(stats.income)}
          </h2>
        </div>
        <div className="p-3 bg-green-50 rounded-full">
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Total Expenses</p>
          <h2 className="text-2xl font-bold text-red-600 mt-1">
            {formatCurrency(stats.expense)}
          </h2>
        </div>
        <div className="p-3 bg-red-50 rounded-full">
          <TrendingDown className="w-6 h-6 text-red-600" />
        </div>
      </div>
    </div>
  );
};

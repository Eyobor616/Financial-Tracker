import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from './services/supabase';
import { Transaction, TransactionFormData } from './types';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load transactions from Supabase
  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      setTransactions(data || []);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Handle adding a new transaction
  const handleAddTransaction = async (formData: TransactionFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const newTransaction = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        type: formData.type,
        created_at: new Date().toISOString(),
      };

      const { data, error: supabaseError } = await supabase
        .from('transactions')
        .insert([newTransaction])
        .select()
        .single();

      if (supabaseError) throw supabaseError;

      if (data) {
        setTransactions((prev) => [data, ...prev]);
      }
    } catch (err: any) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Financial Tracker</h1>
          </div>
          <div className="text-sm text-gray-500">
            Powered by Supabase
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Stats */}
        <Dashboard transactions={transactions} isLoading={isLoading} />

        {/* Transaction Form */}
        <TransactionForm 
          onAddTransaction={handleAddTransaction} 
          isSubmitting={isSubmitting} 
        />

        {/* Transaction List */}
        <TransactionList 
          transactions={transactions} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
};

export default App;

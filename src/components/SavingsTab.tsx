import React, { useState } from 'react';
import { PiggyBank, Plus, Minus, TrendingUp, Calendar } from 'lucide-react';
import { Student, Transaction } from '../types';

interface SavingsTabProps {
  student: Student;
  onTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const SavingsTab: React.FC<SavingsTabProps> = ({ student, onTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePoints = (amount: number) => {
    // 1 poin untuk setiap Rp 2.000
    return Math.floor(amount / 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    setIsProcessing(true);

    const transactionAmount = parseInt(amount);
    const pointsEarned = transactionType === 'deposit' ? calculatePoints(transactionAmount) : 0;

    // Simulate API call
    setTimeout(() => {
      onTransaction({
        studentId: student.id,
        type: transactionType,
        amount: transactionAmount,
        pointsEarned,
        description,
        status: 'completed'
      });

      setAmount('');
      setDescription('');
      setIsProcessing(false);
    }, 1500);
  };

  const quickAmounts = [10000, 25000, 50000, 100000];

  return (
    <div className="p-6 space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Saldo Tabungan Saat Ini</p>
            <p className="text-3xl font-bold">{formatCurrency(student.balance)}</p>
            <p className="text-green-100 text-sm mt-1">Poin: {student.points}</p>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <PiggyBank className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Transaction Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaksi Baru</h2>
        
        {/* Transaction Type Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setTransactionType('deposit')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              transactionType === 'deposit'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Setor</span>
          </button>
          <button
            type="button"
            onClick={() => setTransactionType('withdrawal')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              transactionType === 'withdrawal'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            <Minus className="w-4 h-4" />
            <span className="font-medium">Tarik</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah {transactionType === 'deposit' ? 'Setoran' : 'Penarikan'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="1000"
                step="1000"
                required
              />
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {formatCurrency(quickAmount)}
                </button>
              ))}
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keterangan
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan keterangan transaksi"
              required
            />
          </div>

          {/* Points Preview */}
          {transactionType === 'deposit' && amount && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Poin yang akan didapat: {calculatePoints(parseInt(amount) || 0)} poin
                </span>
              </div>
              <p className="text-xs text-yellow-600 mt-1">
                Setiap Rp 2.000 = 1 poin
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || !amount || !description}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              transactionType === 'deposit'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </div>
            ) : (
              `${transactionType === 'deposit' ? 'Setor' : 'Tarik'} Tabungan`
            )}
          </button>
        </form>
      </div>

      {/* Savings Tips */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Tips Menabung</h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-blue-700 text-sm">Setor tabungan secara rutin setiap minggu untuk mendapatkan poin lebih banyak</p>
          </div>
          <div className="flex items-start space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-blue-700 text-sm">Semakin besar nominal setoran, semakin banyak poin yang didapat</p>
          </div>
          <div className="flex items-start space-x-2">
            <PiggyBank className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-blue-700 text-sm">Kumpulkan poin untuk menukar hadiah menarik di menu Hadiah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsTab;
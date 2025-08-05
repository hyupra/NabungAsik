import React from 'react';
import { PiggyBank, TrendingUp, Gift, History, Coins, Plus } from 'lucide-react';
import { Student, Transaction } from '../types';

interface DashboardProps {
  student: Student;
  recentTransactions: Transaction[];
  onNewTransaction: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ student, recentTransactions, onNewTransaction }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const totalDeposits = recentTransactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonthTransactions = recentTransactions.filter(t => {
    const transactionDate = new Date(t.date);
    const now = new Date();
    return transactionDate.getMonth() === now.getMonth() && 
           transactionDate.getFullYear() === now.getFullYear();
  });

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Selamat Datang, {student.name}!</h1>
        <p className="text-blue-100">Kelola tabungan dan kumpulkan poin untuk mendapatkan hadiah menarik</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Saldo Tabungan</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(student.balance)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Poin</p>
              <p className="text-2xl font-bold text-gray-800">{student.points}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Setoran Bulan Ini</p>
              <p className="text-2xl font-bold text-gray-800">{thisMonthTransactions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Setoran</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalDeposits)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onNewTransaction}
            className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Setor Tabungan</p>
              <p className="text-sm text-gray-500">Tambah saldo dan dapatkan poin</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Tukar Hadiah</p>
              <p className="text-sm text-gray-500">Gunakan poin untuk hadiah</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Lihat Riwayat</p>
              <p className="text-sm text-gray-500">Cek transaksi sebelumnya</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Transaksi Terbaru</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Lihat Semua
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'deposit' ? (
                    <TrendingUp className={`w-5 h-5 ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                {transaction.pointsEarned > 0 && (
                  <p className="text-sm text-yellow-600">+{transaction.pointsEarned} poin</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SavingsTab from './components/SavingsTab';
import RewardsTab from './components/RewardsTab';
import HistoryTab from './components/HistoryTab';
import ProfileTab from './components/ProfileTab';
import { mockStudent, mockTransactions, mockRewards } from './data/mockData';
import { Student, Transaction, Reward } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [student, setStudent] = useState<Student>(mockStudent);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);

  const handleNewTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setTransactions(prev => [transaction, ...prev]);
    
    // Update student balance and points
    setStudent(prev => ({
      ...prev,
      balance: newTransaction.type === 'deposit' 
        ? prev.balance + newTransaction.amount
        : prev.balance - newTransaction.amount,
      points: prev.points + newTransaction.pointsEarned
    }));
  };

  const handleClaimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || student.points < reward.pointsRequired) return;

    // Deduct points from student
    setStudent(prev => ({
      ...prev,
      points: prev.points - reward.pointsRequired
    }));

    // Add claim transaction to history
    const claimTransaction: Transaction = {
      id: Date.now().toString(),
      studentId: student.id,
      type: 'withdrawal',
      amount: 0,
      pointsEarned: -reward.pointsRequired,
      description: `Penukaran hadiah: ${reward.name}`,
      date: new Date().toISOString(),
      status: 'completed'
    };

    setTransactions(prev => [claimTransaction, ...prev]);
  };

  const handleUpdateProfile = (updatedData: Partial<Student>) => {
    setStudent(prev => ({ ...prev, ...updatedData }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            student={student} 
            recentTransactions={transactions}
            onNewTransaction={() => setActiveTab('savings')}
          />
        );
      case 'savings':
        return (
          <SavingsTab 
            student={student} 
            onTransaction={handleNewTransaction}
          />
        );
      case 'rewards':
        return (
          <RewardsTab 
            rewards={rewards}
            student={student}
            onClaimReward={handleClaimReward}
          />
        );
      case 'history':
        return <HistoryTab transactions={transactions} />;
      case 'profile':
        return (
          <ProfileTab 
            student={student}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        student={student}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

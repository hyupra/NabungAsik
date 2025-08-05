import React, { useState } from 'react';
import { Gift, Star, ShoppingBag, Book, Utensils, Smartphone } from 'lucide-react';
import { Reward, Student } from '../types';

interface RewardsTabProps {
  rewards: Reward[];
  student: Student;
  onClaimReward: (rewardId: string) => void;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ rewards, student, onClaimReward }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const categories = [
    { id: 'all', label: 'Semua', icon: Gift },
    { id: 'stationery', label: 'Alat Tulis', icon: Book },
    { id: 'food', label: 'Makanan', icon: Utensils },
    { id: 'electronics', label: 'Elektronik', icon: Smartphone },
    { id: 'books', label: 'Buku', icon: Book },
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const handleClaimClick = (reward: Reward) => {
    setSelectedReward(reward);
    setShowClaimModal(true);
  };

  const confirmClaim = () => {
    if (selectedReward) {
      onClaimReward(selectedReward.id);
      setShowClaimModal(false);
      setSelectedReward(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'stationery': return Book;
      case 'food': return Utensils;
      case 'electronics': return Smartphone;
      case 'books': return Book;
      default: return Gift;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Tukar Hadiah</h1>
            <p className="text-purple-100">Gunakan poin yang telah dikumpulkan untuk mendapatkan hadiah menarik</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
              <Star className="w-8 h-8" />
            </div>
            <p className="text-sm text-purple-100">Poin Anda</p>
            <p className="text-2xl font-bold">{student.points}</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Kategori Hadiah</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => {
          const Icon = getCategoryIcon(reward.category);
          const canClaim = student.points >= reward.pointsRequired && reward.available;
          
          return (
            <div key={reward.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <div className="bg-white bg-opacity-90 rounded-full p-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
                {!reward.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Stok Habis</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{reward.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-gray-800">{reward.pointsRequired} poin</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    canClaim ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {canClaim ? 'Bisa Ditukar' : 'Poin Kurang'}
                  </span>
                </div>
                
                <button
                  onClick={() => handleClaimClick(reward)}
                  disabled={!canClaim}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    canClaim
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canClaim ? 'Tukar Sekarang' : 'Poin Tidak Cukup'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Claim Confirmation Modal */}
      {showClaimModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Konfirmasi Penukaran</h3>
              <p className="text-gray-600 mb-4">
                Apakah Anda yakin ingin menukar <strong>{selectedReward.pointsRequired} poin</strong> dengan <strong>{selectedReward.name}</strong>?
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Poin saat ini:</span>
                  <span className="font-semibold">{student.points}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Poin yang digunakan:</span>
                  <span className="font-semibold text-red-600">-{selectedReward.pointsRequired}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800">Sisa poin:</span>
                  <span className="font-bold text-green-600">{student.points - selectedReward.pointsRequired}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClaimModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmClaim}
                  className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Tukar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsTab;
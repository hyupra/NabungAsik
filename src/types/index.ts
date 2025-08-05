export interface Student {
  id: string;
  name: string;
  class: string;
  studentId: string;
  balance: number;
  points: number;
  avatar?: string;
}

export interface Transaction {
  id: string;
  studentId: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  pointsEarned: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  image: string;
  category: 'stationery' | 'food' | 'electronics' | 'books';
  available: boolean;
}

export interface ClaimedReward {
  id: string;
  studentId: string;
  rewardId: string;
  claimedAt: string;
  status: 'pending' | 'delivered';
}
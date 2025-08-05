import { Student, Transaction, Reward } from "../types";

export const mockStudent: Student = {
  id: "1",
  name: "Anisa Sapita Dewi",
  class: "XII IPA 1",
  studentId: "2024001",
  balance: 250000,
  points: 125,
  avatar:
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
};

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    studentId: "1",
    type: "deposit",
    amount: 50000,
    pointsEarned: 25,
    description: "Setoran rutin mingguan",
    date: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "2",
    studentId: "1",
    type: "deposit",
    amount: 100000,
    pointsEarned: 50,
    description: "Setoran dari uang saku",
    date: "2024-01-10T14:20:00Z",
    status: "completed",
  },
  {
    id: "3",
    studentId: "1",
    type: "deposit",
    amount: 75000,
    pointsEarned: 37,
    description: "Setoran bonus prestasi",
    date: "2024-01-05T09:15:00Z",
    status: "completed",
  },
  {
    id: "4",
    studentId: "1",
    type: "withdrawal",
    amount: 25000,
    pointsEarned: 0,
    description: "Penarikan untuk keperluan sekolah",
    date: "2024-01-08T11:45:00Z",
    status: "completed",
  },
];

export const mockRewards: Reward[] = [
  {
    id: "1",
    name: "Pulpen Set Premium",
    description: "Set pulpen warna-warni berkualitas tinggi",
    pointsRequired: 50,
    image:
      "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    category: "stationery",
    available: true,
  },
  {
    id: "2",
    name: "Voucher Kantin Rp 25.000",
    description: "Voucher makan di kantin sekolah",
    pointsRequired: 75,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    category: "food",
    available: true,
  },
  {
    id: "3",
    name: "Buku Tulis Premium",
    description: "Paket 5 buku tulis dengan cover menarik",
    pointsRequired: 40,
    image:
      "https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    category: "stationery",
    available: true,
  },
  {
    id: "4",
    name: "Power Bank Mini",
    description: "Power bank portable 5000mAh",
    pointsRequired: 200,
    image:
      "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    category: "electronics",
    available: true,
  },
  {
    id: "5",
    name: "Novel Bestseller",
    description: "Koleksi novel terpopuler untuk bacaan",
    pointsRequired: 100,
    image:
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    category: "books",
    available: true,
  },
  {
    id: "6",
    name: "Tas Ransel Sekolah",
    description: "Tas ransel berkualitas untuk sekolah",
    pointsRequired: 300,
    image:
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    category: "stationery",
    available: false,
  },
];

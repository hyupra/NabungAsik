import React from 'react';
import { 
  Home, 
  PiggyBank, 
  History, 
  Gift, 
  User, 
  Settings,
  LogOut,
  Coins
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  student: {
    name: string;
    class: string;
    studentId: string;
    points: number;
    avatar?: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, student }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'savings', label: 'Tabungan', icon: PiggyBank },
    { id: 'history', label: 'Riwayat', icon: History },
    { id: 'rewards', label: 'Hadiah', icon: Gift },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {student.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{student.name}</h3>
            <p className="text-sm text-gray-500">{student.class}</p>
            <p className="text-xs text-gray-400">ID: {student.studentId}</p>
          </div>
        </div>
        
        {/* Points Display */}
        <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5" />
              <span className="font-medium">Points</span>
            </div>
            <span className="font-bold text-lg">{student.points}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Pengaturan</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
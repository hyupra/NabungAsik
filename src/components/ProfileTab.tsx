import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  Award,
  Save,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { Student } from '../types';

interface ProfileTabProps {
  student: Student;
  onUpdateProfile: (updatedStudent: Partial<Student>) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ student, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: student.name,
    email: 'ahmad.rizki@email.com',
    phone: '081234567890',
    address: 'Jl. Pendidikan No. 123, Jakarta',
    birthDate: '2006-05-15',
    parentName: 'Budi Santoso',
    parentPhone: '081987654321'
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSaveProfile = () => {
    onUpdateProfile({ name: editForm.name });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Simulate password change
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      alert('Password berhasil diubah!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePassword(false);
    } else {
      alert('Password baru dan konfirmasi tidak cocok!');
    }
  };

  const achievements = [
    { title: 'Penabung Rajin', description: 'Menabung 10 kali berturut-turut', icon: '🏆', earned: true },
    { title: 'Poin Master', description: 'Mengumpulkan 100 poin', icon: '⭐', earned: true },
    { title: 'Hemat Cermat', description: 'Tidak menarik tabungan selama 1 bulan', icon: '💎', earned: false },
    { title: 'Collector', description: 'Menukar 5 hadiah berbeda', icon: '🎁', earned: false }
  ];

  const savingsGoals = [
    { name: 'Laptop Baru', target: 5000000, current: 250000, deadline: '2024-12-31' },
    { name: 'Liburan Keluarga', target: 2000000, current: 150000, deadline: '2024-06-30' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Profil Siswa</h1>
        <p className="text-indigo-100">Kelola informasi pribadi dan pengaturan akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Batal' : 'Edit'}</span>
              </button>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {student.name.charAt(0)}
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                <p className="text-gray-600">{student.class}</p>
                <p className="text-sm text-gray-500">ID: {student.studentId}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{student.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                <p className="text-gray-800">{student.class}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{editForm.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{editForm.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                {isEditing ? (
                  <textarea
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{editForm.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editForm.birthDate}
                    onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{new Date(editForm.birthDate).toLocaleDateString('id-ID')}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan</span>
                </button>
              </div>
            )}
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Orang Tua</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Orang Tua</label>
                <p className="text-gray-800">{editForm.parentName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon Orang Tua</label>
                <p className="text-gray-800">{editForm.parentPhone}</p>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Keamanan</h2>
              <button
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showChangePassword ? 'Tutup' : 'Ubah Password'}
              </button>
            </div>

            {showChangePassword && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ubah Password
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik Akun</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Saldo Tabungan</span>
                <span className="font-semibold text-green-600">{formatCurrency(student.balance)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Poin</span>
                <span className="font-semibold text-yellow-600">{student.points}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Sejak</span>
                <span className="font-semibold text-gray-800">Jan 2024</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pencapaian</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </p>
                    <p className={`text-xs ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Award className="w-5 h-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Savings Goals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Target Tabungan</h3>
            <div className="space-y-4">
              {savingsGoals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{goal.name}</span>
                      <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatCurrency(goal.current)}</span>
                      <span>{formatCurrency(goal.target)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
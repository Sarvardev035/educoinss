import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, TopNav, PageHeader } from '../../components/shared/Navigation';

// Generic Dashboard Layout Template
const DashboardPage = ({ title, subtitle, icon, children, navigation, type }) => {
  const defaultNav = [
    { path: '/student/dashboard', label: 'Home', icon: 'home' },
    { path: '/student/marketplace', label: 'Marketplace', icon: 'shopping_bag' },
    { path: '/student/library', label: 'Library', icon: 'library_books' },
    { path: '/student/wardrobe', label: 'Wardrobe', icon: 'checkroom' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar navigation={navigation || defaultNav} />
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <TopNav />
        <PageHeader title={title} subtitle={subtitle} />
        {children}
      </main>
    </div>
  );
};

const StudentDashboard = () => {
  const navigation = [
    { path: '/student/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/student/marketplace', label: 'Marketplace', icon: 'shopping_bag' },
    { path: '/student/library', label: 'Library', icon: 'library_books' },
    { path: '/student/wardrobe', label: 'Wardrobe', icon: 'checkroom' },
    { path: '/student/gifts', label: 'Gifts', icon: 'card_giftcard' },
    { path: '/study-session', label: 'Study', icon: 'school' },
  ];

  return (
    <DashboardPage
      title="Dashboard"
      subtitle="Your academic journey and rewards"
      navigation={navigation}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Level Card */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-on-surface-variant text-sm font-semibold">Current Level</h3>
            <span className="material-symbols-outlined text-primary">trophy</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-2">Level 4</p>
          <p className="text-on-surface-variant text-sm">840 / 2,000 XP to next level</p>
          <div className="mt-4 bg-surface-container-low rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '42%' }}></div>
          </div>
        </div>

        {/* Coins Card */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-on-surface-variant text-sm font-semibold">Total Coins</h3>
            <span className="material-symbols-outlined text-tertiary fill-icon">monetization_on</span>
          </div>
          <p className="text-3xl font-bold text-tertiary mb-2">2,450</p>
          <p className="text-on-surface-variant text-sm">+120 this week</p>
        </div>

        {/* Rank Card */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-on-surface-variant text-sm font-semibold">Rank</h3>
            <span className="material-symbols-outlined text-secondary">star</span>
          </div>
          <p className="text-3xl font-bold text-secondary mb-2">Coin Hunter</p>
          <p className="text-on-surface-variant text-sm">Top 15% of students</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
        <h3 className="text-lg font-bold text-on-surface mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-high transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
            </div>
            <div>
              <p className="text-on-surface font-semibold">Completed Math Quiz</p>
              <p className="text-on-surface-variant text-sm">+150 XP • Today</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-high transition-colors">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-sm">emoji_events</span>
            </div>
            <div>
              <p className="text-on-surface font-semibold">Achieved Streak Bonus</p>
              <p className="text-on-surface-variant text-sm">+250 XP • Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default StudentDashboard;

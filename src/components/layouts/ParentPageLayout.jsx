import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ParentPageLayout - Reusable layout for all parent pages
 * Handles navigation, responsive layout, sidebar, top nav, and bottom nav
 */
export default function ParentPageLayout({ children, title = '' }) {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/parent/dashboard' },
    { label: 'Treasury', icon: 'account_balance_wallet', route: '/parent/treasury-tips' },
    { label: 'Gift Manager', icon: 'card_giftcard', route: '/parent/gift-manager' },
    { label: 'Library', icon: 'library_books', route: '/parent/library-manager' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  const handleNavigate = (route) => {
    navigate(route);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    navigate('/role-selection');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-surface-container border-b border-outline-variant/20">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary">family_restroom</span>
            </div>
            <h1 className="hidden sm:block text-lg font-bold text-on-surface">Parent Portal</h1>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavigate(item.route)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container transition-colors text-sm font-medium"
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right side: Profile + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigate('/settings')}
              className="p-2 hover:bg-surface-container rounded-lg transition-colors"
              aria-label="Profile"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-surface-container rounded-lg transition-colors"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-surface-container border-t border-outline-variant/20 px-4 py-2">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavigate(item.route)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-surface transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 mt-16 md:mt-20">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:flex md:w-64 lg:w-72 bg-surface-container border-r border-outline-variant/20 flex-col p-4 gap-4 fixed left-0 top-20 bottom-0">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-outline-variant mb-3">Navigation</h2>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavigate(item.route)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface transition-colors text-sm"
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Page Content */}
        <main className="flex-1 md:ml-64 lg:ml-72 px-4 md:px-6 py-6">
          {title && (
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            </div>
          )}
          {children}
        </main>
      </div>

      {/* Bottom Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container border-t border-outline-variant/20">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.route}
              onClick={() => handleNavigate(item.route)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-surface transition-colors"
              aria-label={item.label}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Sign Out"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span className="text-xs">Exit</span>
          </button>
        </div>
      </nav>

      {/* Mobile content padding to prevent overlap with bottom nav */}
      <div className="md:hidden h-20" />
    </div>
  );
}

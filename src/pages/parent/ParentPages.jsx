import { Link } from 'react-router-dom';
import { Sidebar, TopNav, PageHeader } from '../../components/shared/Navigation';

const PlaceholderDashboard = ({ title, subtitle, links }) => {
  const defaultNav = [
    { path: '/parent/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/parent/gift-manager', label: 'Gifts', icon: 'card_giftcard' },
    { path: '/parent/library-manager', label: 'Library', icon: 'library_books' },
    { path: '/parent/treasury-tips', label: 'Treasury', icon: 'account_balance_wallet' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar navigation={defaultNav} />
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <TopNav />
        <PageHeader title={title} subtitle={subtitle} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-on-surface-variant text-sm font-semibold">Linked Children</h3>
              <span className="material-symbols-outlined text-secondary">group</span>
            </div>
            <p className="text-3xl font-bold text-secondary mb-2">2</p>
            <p className="text-on-surface-variant text-sm">Active accounts</p>
          </div>

          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-on-surface-variant text-sm font-semibold">Total Treasury</h3>
              <span className="material-symbols-outlined text-tertiary fill-icon">monetization_on</span>
            </div>
            <p className="text-3xl font-bold text-tertiary mb-2">5,200</p>
            <p className="text-on-surface-variant text-sm">Parent rewards pool</p>
          </div>

          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-on-surface-variant text-sm font-semibold">Pending Requests</h3>
              <span className="material-symbols-outlined text-primary">notifications</span>
            </div>
            <p className="text-3xl font-bold text-primary mb-2">3</p>
            <p className="text-on-surface-variant text-sm">Awaiting approval</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
          <h3 className="text-lg font-bold text-on-surface mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/parent/library-manager" className="p-4 bg-surface-container-high rounded-lg text-center hover:bg-surface-bright transition-all group">
              <span className="material-symbols-outlined text-2xl text-primary mb-2 block">library_add</span>
              <p className="text-sm text-on-surface">Add Resource</p>
            </Link>
            <Link to="/parent/gift-manager" className="p-4 bg-surface-container-high rounded-lg text-center hover:bg-surface-bright transition-all group">
              <span className="material-symbols-outlined text-2xl text-secondary mb-2 block">card_giftcard</span>
              <p className="text-sm text-on-surface">Manage Gifts</p>
            </Link>
            <Link to="/parent/treasury-tips" className="p-4 bg-surface-container-high rounded-lg text-center hover:bg-surface-bright transition-all group">
              <span className="material-symbols-outlined text-2xl text-tertiary mb-2 block">tips_and_updates</span>
              <p className="text-sm text-on-surface">Tips & Guides</p>
            </Link>
            <Link to="/settings" className="p-4 bg-surface-container-high rounded-lg text-center hover:bg-surface-bright transition-all group">
              <span className="material-symbols-outlined text-2xl text-primary mb-2 block">settings</span>
              <p className="text-sm text-on-surface">Settings</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export const ParentDashboard = () => (
  <PlaceholderDashboard 
    title="Observatory Dashboard" 
    subtitle="Real-time academic oversight and rewards management"
  />
);

export const ParentDashboard2 = () => (
  <PlaceholderDashboard 
    title="Dashboard 2" 
    subtitle="Alternative dashboard view"
  />
);

export const GiftManager = () => (
  <PlaceholderDashboard 
    title="Gift Manager" 
    subtitle="Create and manage gift rewards for your children"
  />
);

export const GiftManager2 = () => (
  <PlaceholderDashboard 
    title="Gift Manager 2" 
    subtitle="Advanced gift management options"
  />
);

export const LibraryManager = () => (
  <PlaceholderDashboard 
    title="Library Manager" 
    subtitle="Curate learning resources for your children"
  />
);

export const TreasuryTips = () => (
  <PlaceholderDashboard 
    title="Treasury Tips" 
    subtitle="Expert guidance on managing rewards and budgets"
  />
);

const ParentPages = {
  ParentDashboard,
  ParentDashboard2,
  GiftManager,
  GiftManager2,
  LibraryManager,
  TreasuryTips,
};

export default ParentPages;

import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ navigation }) => {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#131317] border-r border-white/5 flex flex-col p-4 gap-2 z-40 hidden md:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary">rocket_launch</span>
        </div>
        <div>
          <h1 className="font-['Space_Grotesk'] text-xl font-black text-white leading-none">EduCoin</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">Portal</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#19191e] text-[#5af9f3] border-l-4 border-[#5af9f3]'
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-['Inter'] text-sm uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-white/5 space-y-1">
        <Link to="/settings" className="flex items-center gap-3 text-slate-500 px-4 py-2 hover:text-white transition-all">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-['Inter'] text-sm uppercase tracking-wider">Settings</span>
        </Link>
        <Link to="/auth" className="flex items-center gap-3 text-slate-500 px-4 py-2 hover:text-white transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-['Inter'] text-sm uppercase tracking-wider">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};

export const TopNav = () => {
  return (
    <header className="flex justify-between items-center mb-10">
      <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-bright transition-colors md:hidden">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="flex items-center gap-4 ml-auto">
        <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-bright transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-secondary">
          <img
            alt="Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdp2T3Xszd-9vMLwyO1NUS1wqB1s_UMaTjs0KUafU9ZPYrp58f046NUAM7-ZsXaX0iAPqyqt-NlA2y7Z_5wU_iyjCajujRdJ3GO6MbpKhlFhIznn-YnE_485p4nj0QuiY7QtFsB2bc69oR4MXDGZBIjqiLX0eRO0J-ANXlPlYlxiQ6ONkI-jYNrAOrHRuSFFCOkJlwNhiIcNlkQXGQzXqf3xE52WycMZkRZYni4a7PoMiv1Gp2iJg0kKJPNtH6AdYN1tvvGukU6g"
            />
        </div>
      </div>
    </header>
  );
};

export const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-10">
      <h2 className="headline-font text-3xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-on-surface-variant text-sm mt-1">{subtitle}</p>}
    </div>
  );
};

const Navigation = { Sidebar, TopNav, PageHeader };

export default Navigation;

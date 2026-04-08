import { Link } from 'react-router-dom';

const CommonPage = ({ title, subtitle, icon }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <nav className="sticky top-0 z-40 bg-surface-container border-b border-outline-variant/10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/role-selection" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-2xl text-primary">arrow_back</span>
            <h1 className="headline-font text-xl font-bold text-on-surface">Back</h1>
          </Link>
          <h2 className="headline-font text-2xl font-bold text-on-surface">{title}</h2>
          <div className="w-8"></div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <span className="material-symbols-outlined text-6xl text-primary block mb-4">{icon}</span>
          </div>
          <h2 className="text-3xl font-bold text-on-surface mb-3">{title}</h2>
          <p className="text-on-surface-variant mb-8">{subtitle}</p>
          <div className="space-y-3">
            <Link to="/role-selection" className="block px-6 py-3 bg-primary text-on-primary rounded-lg hover:brightness-110 transition-all">
              Back to Role Selection
            </Link>
            <Link to="/student/dashboard" className="block px-6 py-3 bg-surface-container text-on-surface rounded-lg border border-outline-variant/20 hover:bg-surface-container-high transition-all">
              Go to Student Hub
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export const Settings = () => <CommonPage title="Settings" subtitle="Manage your profile and preferences" icon="settings" />;
export const Chat = () => <CommonPage title="Direct Chat" subtitle="Connect with friends and instructors" icon="chat" />;
export const CommunityClasses = () => <CommonPage title="Community Classes" subtitle="Join group learning sessions" icon="school" />;
export const HeroForge = () => <CommonPage title="Hero Forge" subtitle="Create and customize your character" icon="stars" />;
export const TradingHub = () => <CommonPage title="Trading Hub" subtitle="Trade and exchange with other students" icon="swap_horiz" />;
export const HeroCustomizer = () => <CommonPage title="Hero Customizer" subtitle="Personalize your hero avatar" icon="palette" />;
export const EliteGear = () => <CommonPage title="Elite Gear" subtitle="Unlock premium equipment and items" icon="shield" />;
export const RoleFlow = () => <CommonPage title="Role Selection Flow" subtitle="Select your user role" icon="person" />;

const CommonPages = {
  Settings,
  Chat,
  CommunityClasses,
  HeroForge,
  TradingHub,
  HeroCustomizer,
  EliteGear,
  RoleFlow,
};

export default CommonPages;

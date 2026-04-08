import { Link } from 'react-router-dom';
import { Sidebar, TopNav, PageHeader } from '../../components/shared/Navigation';

const PlaceholderPage = ({ title, subtitle, route }) => {
  const navigation = [
    { path: '/student/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/student/marketplace', label: 'Marketplace', icon: 'shopping_bag' },
    { path: '/student/library', label: 'Library', icon: 'library_books' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar navigation={navigation} />
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <TopNav />
        <PageHeader title={title} subtitle={subtitle} />
        <div className="bg-surface-container rounded-xl p-8 text-center border border-outline-variant/10">
          <span className="material-symbols-outlined text-4xl text-primary mb-4 block">construction</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">{title}</h2>
          <p className="text-on-surface-variant mb-6">{subtitle}</p>
          <Link to="/student/dashboard" className="px-6 py-3 bg-primary text-on-primary rounded-lg hover:brightness-110 transition-all inline-block">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export const StudentDashboard2 = () => <PlaceholderPage title="Dashboard 2" subtitle="Alternative dashboard view" />;
export const AvatarShop = () => <PlaceholderPage title="Avatar Shop" subtitle="Customize your character avatar" />;
export const Wardrobe = () => <PlaceholderPage title="Wardrobe" subtitle="Browse and equip hero costumes" />;
export const Wardrobe2 = () => <PlaceholderPage title="Wardrobe 2" subtitle="Additional wardrobe options" />;
export const Wardrobe3 = () => <PlaceholderPage title="Wardrobe 3" subtitle="More costume selections" />;
export const Wardrobe4 = () => <PlaceholderPage title="Wardrobe 4" subtitle="Exclusive costume collection" />;
export const WardrobeFriendly = () => <PlaceholderPage title="Friendly Wardrobe" subtitle="Kid-friendly avatar options" />;
export const Marketplace = () => <PlaceholderPage title="Marketplace" subtitle="Buy and sell rewards" />;
export const Library = () => <PlaceholderPage title="Library" subtitle="Access learning resources" />;
export const GiftRequests = () => <PlaceholderPage title="Gift Requests" subtitle="Manage gift requests" />;
export const GiftRequests2 = () => <PlaceholderPage title="Gift Requests 2" subtitle="Additional gift options" />;
export const StudySession = () => <PlaceholderPage title="Study Session" subtitle="Active study session" />;
export const StudySession2 = () => <PlaceholderPage title="Study Session 2" subtitle="Alternative study format" />;
export const StudySession3 = () => <PlaceholderPage title="Study Session 3" subtitle="Collaborative study" />;
export const StudySession4 = () => <PlaceholderPage title="Study Session 4" subtitle="Advanced study tools" />;

const StudentPages = {
  StudentDashboard2,
  AvatarShop,
  Wardrobe,
  Wardrobe2,
  Wardrobe3,
  Wardrobe4,
  WardrobeFriendly,
  Marketplace,
  Library,
  GiftRequests,
  GiftRequests2,
  StudySession,
  StudySession2,
  StudySession3,
  StudySession4,
};

export default StudentPages;

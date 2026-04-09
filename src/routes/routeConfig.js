// Import all page components
import React, { lazy, Suspense } from 'react';

// Lazy load components for better performance
const RoleSelection = lazy(() => import('../pages/RoleSelection'));
const RoleSelection2 = lazy(() => import('../pages/RoleSelection2'));
const StudentAuth = lazy(() => import('../pages/student/StudentAuth'));
const StudentRegister = lazy(() => import('../pages/student/StudentRegister'));
const ParentAuth = lazy(() => import('../pages/parent/ParentAuth'));
const ParentRegister = lazy(() => import('../pages/parent/ParentRegister'));
const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard'));
const StudentDashboard2 = lazy(() => import('../pages/student/StudentDashboard2'));
const ParentDashboard = lazy(() => import('../pages/parent/ParentDashboard'));
const ParentDashboard2 = lazy(() => import('../pages/parent/ParentDashboard2'));
const AvatarShop = lazy(() => import('../pages/student/AvatarShop'));
const Wardrobe = lazy(() => import('../pages/student/Wardrobe'));
const Wardrobe2 = lazy(() => import('../pages/student/Wardrobe2'));
const Wardrobe3 = lazy(() => import('../pages/student/Wardrobe3'));
const Wardrobe4 = lazy(() => import('../pages/student/Wardrobe4'));
const WardrobeFriendly = lazy(() => import('../pages/student/WardrobeFriendly'));
const Marketplace = lazy(() => import('../pages/student/Marketplace'));
const Library = lazy(() => import('../pages/student/Library'));
const GiftRequests = lazy(() => import('../pages/student/GiftRequests'));
const GiftRequests2 = lazy(() => import('../pages/student/GiftRequests2'));
const StudySession = lazy(() => import('../pages/student/StudySession'));
const StudySession2 = lazy(() => import('../pages/student/StudySession2'));
const StudySession3 = lazy(() => import('../pages/student/StudySession3'));
const StudySession4 = lazy(() => import('../pages/student/StudySession4'));
const EnhancedStudySession = lazy(() => import('../pages/student/EnhancedStudySession'));
const GiftManager = lazy(() => import('../pages/parent/GiftManager'));
const GiftManager2 = lazy(() => import('../pages/parent/GiftManager2'));
const LibraryManager = lazy(() => import('../pages/parent/LibraryManager'));
const TreasuryTips = lazy(() => import('../pages/parent/TreasuryTips'));
const ChildDetailedActivity = lazy(() => import('../pages/parent/ChildDetailedActivity'));
const ParentControlSettings = lazy(() => import('../pages/parent/ParentControlSettings'));
const Settings = lazy(() => import('../pages/Settings'));
const Chat = lazy(() => import('../pages/Chat'));
const CommunityClasses = lazy(() => import('../pages/CommunityClasses'));
const HeroForge = lazy(() => import('../pages/HeroForge'));
const TradingHub = lazy(() => import('../pages/TradingHub'));
const HeroCustomizer = lazy(() => import('../pages/HeroCustomizer'));
const EliteGear = lazy(() => import('../pages/EliteGear'));
const RoleFlow = lazy(() => import('../pages/RoleFlow'));

// Loading component for lazy loaded pages
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Wrapper component to provide suspense boundaries
const PageWrapper = ({ component: Component }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const routes = [
  // Authentication Routes
  { path: '/role-selection', component: () => <PageWrapper component={RoleSelection} /> },
  { path: '/role-selection-2', component: () => <PageWrapper component={RoleSelection2} /> },
  { path: '/role-flow', component: () => <PageWrapper component={RoleFlow} /> },
  { path: '/student/login', component: () => <PageWrapper component={StudentAuth} /> },
  { path: '/student/register', component: () => <PageWrapper component={StudentRegister} /> },
  { path: '/parent/login', component: () => <PageWrapper component={ParentAuth} /> },
  { path: '/parent/register', component: () => <PageWrapper component={ParentRegister} /> },

  // Student Routes
  { path: '/student/dashboard', component: () => <PageWrapper component={StudentDashboard} /> },
  { path: '/student/dashboard-2', component: () => <PageWrapper component={StudentDashboard2} /> },
  { path: '/student/avatar-shop', component: () => <PageWrapper component={AvatarShop} /> },
  { path: '/student/wardrobe', component: () => <PageWrapper component={Wardrobe} /> },
  { path: '/student/wardrobe-2', component: () => <PageWrapper component={Wardrobe2} /> },
  { path: '/student/wardrobe-3', component: () => <PageWrapper component={Wardrobe3} /> },
  { path: '/student/wardrobe-4', component: () => <PageWrapper component={Wardrobe4} /> },
  { path: '/student/wardrobe-friendly', component: () => <PageWrapper component={WardrobeFriendly} /> },
  { path: '/student/marketplace', component: () => <PageWrapper component={Marketplace} /> },
  { path: '/student/library', component: () => <PageWrapper component={Library} /> },
  { path: '/student/gifts', component: () => <PageWrapper component={GiftRequests} /> },
  { path: '/student/gifts-2', component: () => <PageWrapper component={GiftRequests2} /> },

  // Study Session Routes
  { path: '/study-session', component: () => <PageWrapper component={StudySession} /> },
  { path: '/study-session-2', component: () => <PageWrapper component={StudySession2} /> },
  { path: '/study-session-3', component: () => <PageWrapper component={StudySession3} /> },
  { path: '/study-session-4', component: () => <PageWrapper component={StudySession4} /> },
  { path: '/study-session-enhanced', component: () => <PageWrapper component={EnhancedStudySession} /> },

  // Parent Routes
  { path: '/parent/dashboard', component: () => <PageWrapper component={ParentDashboard} /> },
  { path: '/parent/dashboard-2', component: () => <PageWrapper component={ParentDashboard2} /> },
  { path: '/parent/gift-manager', component: () => <PageWrapper component={GiftManager} /> },
  { path: '/parent/gift-manager-2', component: () => <PageWrapper component={GiftManager2} /> },
  { path: '/parent/library-manager', component: () => <PageWrapper component={LibraryManager} /> },
  { path: '/parent/treasury-tips', component: () => <PageWrapper component={TreasuryTips} /> },
  { path: '/parent/child-activity', component: () => <PageWrapper component={ChildDetailedActivity} /> },
  { path: '/parent/control-settings', component: () => <PageWrapper component={ParentControlSettings} /> },

  // Common Routes
  { path: '/settings', component: () => <PageWrapper component={Settings} /> },
  { path: '/chat', component: () => <PageWrapper component={Chat} /> },
  { path: '/community-classes', component: () => <PageWrapper component={CommunityClasses} /> },
  { path: '/hero-forge', component: () => <PageWrapper component={HeroForge} /> },
  { path: '/trading-hub', component: () => <PageWrapper component={TradingHub} /> },
  { path: '/hero-customizer', component: () => <PageWrapper component={HeroCustomizer} /> },
  { path: '/elite-gear', component: () => <PageWrapper component={EliteGear} /> },
];

export default routes;

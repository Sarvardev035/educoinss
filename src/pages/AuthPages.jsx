import React from 'react';
import { Link } from 'react-router-dom';

// Template for Auth Pages
const AuthPage = ({ title, subtitle, role }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden bg-gradient-to-br from-surface to-primary-dim">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary fill-icon">rocket_launch</span>
            </div>
            <h1 className="headline-font text-2xl font-black text-white">EduCoin</h1>
          </div>
          <h2 className="headline-font text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-on-surface-variant text-lg">{subtitle}</p>
        </div>
        <div className="text-on-surface-variant text-sm">© 2024 EduCoin Platform</div>
      </section>

      {/* Right Panel - Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-container">
        <div className="w-full max-w-md">
          <h3 className="headline-font text-2xl font-bold text-on-surface mb-8">{title}</h3>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
            />
            <button className="w-full px-4 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:brightness-110 transition-all">
              {title === 'Register' ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center text-on-surface-variant">
            <Link to="/role-selection" className="text-primary hover:underline">
              Back to role selection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export const StudentAuth = () => <AuthPage title="Student Login" subtitle="Access your learning journey" role="student" />;
export const StudentRegister = () => <AuthPage title="Student Registration" subtitle="Start your education rewards experience" role="student" />;
export const ParentAuth = () => <AuthPage title="Parent Login" subtitle="Monitor and guide your child's progress" role="parent" />;
export const ParentRegister = () => <AuthPage title="Parent Registration" subtitle="Create parent account and link your child" role="parent" />;

export default { StudentAuth, StudentRegister, ParentAuth, ParentRegister };

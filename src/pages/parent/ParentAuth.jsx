import React from 'react';
import { Link } from 'react-router-dom';

const ParentAuth = () => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden bg-gradient-to-br from-surface to-secondary-dim">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary fill-icon">rocket_launch</span>
            </div>
            <h1 className="headline-font text-2xl font-black text-white">EduCoin</h1>
          </div>
          <h2 className="headline-font text-4xl font-bold text-white mb-4">Parent Control Center</h2>
          <p className="text-on-surface-variant text-lg">Monitor and guide your child's academic journey and rewards</p>
        </div>
        <div className="text-on-surface-variant text-sm">© 2024 EduCoin Platform</div>
      </section>

      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-container">
        <div className="w-full max-w-md">
          <h3 className="headline-font text-2xl font-bold text-on-surface mb-8">Parent Login</h3>
          <form className="space-y-4">
            <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-secondary" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-secondary" />
            <Link to="/parent/dashboard" className="block w-full px-4 py-3 bg-secondary text-on-secondary rounded-lg font-semibold text-center hover:brightness-110 transition-all">
              Sign In
            </Link>
          </form>
          <div className="mt-6 text-center">
            <p className="text-on-surface-variant">Don't have an account? <Link to="/parent/register" className="text-secondary hover:underline">Register here</Link></p>
            <Link to="/role-selection" className="block mt-4 text-secondary hover:underline">Back to role selection</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentAuth;

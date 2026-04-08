import { Link } from 'react-router-dom';

const RoleSelection2 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <main className="flex items-center justify-center flex-grow">
        <div className="text-center">
          <h1 className="headline-font text-4xl font-bold text-on-surface mb-4">Role Selection 2</h1>
          <p className="text-on-surface-variant mb-8">Variant role selection screen</p>
          <Link to="/role-selection" className="px-6 py-3 bg-primary text-on-primary rounded-lg hover:brightness-110">
            Back to Main Selection
          </Link>
        </div>
      </main>
    </div>
  );
};

export default RoleSelection2;

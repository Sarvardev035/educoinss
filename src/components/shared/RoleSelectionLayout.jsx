import { Link } from 'react-router-dom';

const RoleCard = ({ to, icon, title, description, accentClass, iconClass, ctaText, ctaClass }) => (
  <Link
    to={to}
    className="group relative role-card w-full text-left focus:outline-none transition-transform active:scale-[0.98]"
  >
    <div className={`absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 ${accentClass}`} />
    <div className="relative bg-surface-container-low border border-outline-variant/15 rounded-xl p-8 h-full flex flex-col items-center text-center transition-all duration-300 group-hover:border-primary/50 group-hover:bg-surface-container overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700">
        <span className="material-symbols-outlined text-9xl">{icon}</span>
      </div>
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${iconClass}`}>
        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="font-body text-outline-variant text-base mb-8">{description}</p>
      <div className={`mt-auto w-full py-3 px-6 rounded-lg border font-label text-sm uppercase tracking-widest transition-colors duration-300 ${ctaClass}`}>
        {ctaText}
      </div>
    </div>
  </Link>
);

export default function RoleSelectionLayout({
  title = 'Turn discipline into currency',
  subtitle = 'Join the digital observatory where academic excellence meets the blockchain. Select your portal to begin.',
  studentTo = '/student/dashboard',
  parentTo = '/parent/dashboard',
  studentTitle = "I'm a Student",
  parentTitle = "I'm a Parent",
  studentDescription = 'Earn coins, level up, unlock rewards',
  parentDescription = 'Monitor, guide, and reward your child',
  studentCta = 'Enter Workspace',
  parentCta = 'Launch Command Center',
}) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-6 py-12 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.2)]">
              <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                monetization_on
              </span>
            </div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">EduCoin 2.0</h1>
          </div>
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-on-surface to-outline-variant tracking-tighter">
            {title}
          </h2>
          <p className="font-body text-outline text-lg max-w-md mx-auto">{subtitle}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <RoleCard
            to={studentTo}
            icon="school"
            title={studentTitle}
            description={studentDescription}
            accentClass="bg-primary/20"
            iconClass="bg-primary/10 text-primary"
            ctaText={studentCta}
            ctaClass="bg-primary/5 border-primary/20 text-primary group-hover:bg-primary group-hover:text-on-primary"
          />
          <RoleCard
            to={parentTo}
            icon="family_restroom"
            title={parentTitle}
            description={parentDescription}
            accentClass="bg-secondary/20"
            iconClass="bg-secondary/10 text-secondary"
            ctaText={parentCta}
            ctaClass="bg-secondary/5 border-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-on-secondary"
          />
        </div>

        <footer className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 px-6 py-2 rounded-full bg-surface-container border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline">Network Status:</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-body text-xs font-medium text-secondary">Mainnet Operational</span>
            </div>
            <div className="w-px h-4 bg-outline-variant/20 mx-1" />
            <span className="font-body text-xs text-outline">v2.0.4-stable</span>
          </div>
          <div className="flex gap-8">
            <Link className="text-outline hover:text-on-surface font-body text-sm transition-colors" to="/settings">
              Privacy Protocol
            </Link>
            <Link className="text-outline hover:text-on-surface font-body text-sm transition-colors" to="/community-classes">
              Governance Docs
            </Link>
            <Link className="text-outline hover:text-on-surface font-body text-sm transition-colors" to="/chat">
              Support
            </Link>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-8 pointer-events-none opacity-30">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
      </div>
    </div>
  );
}

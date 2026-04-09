import { Link } from 'react-router-dom';

export default function ChildDetailedActivity() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Child Detailed Activity</h1>
            <p className="text-slate-400 mt-2">Live study timeline, engagement trends, and session quality insights.</p>
          </div>
          <Link to="/parent/dashboard" className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition">Back to Dashboard</Link>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-6">
          <img
            src="/screens/child-detailed-activity.png"
            alt="Child detailed activity screen"
            className="w-full rounded-xl border border-slate-700"
          />
        </section>
      </div>
    </main>
  );
}

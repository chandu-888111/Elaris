import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export function UniverseFooter() {
  return (
    <footer className="relative py-32 px-6 md:px-24 border-t border-white/5  overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-spark/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-24">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-6 text-white/50 text-sm max-w-xs leading-relaxed">
              The ultimate AI operating system for developers. Generate ideas, learn faster, and ship to the cosmos.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Ecosystem</h4>
            <ul className="space-y-4">
              <li><Link to="/generator" className="text-white/50 hover:text-white transition text-sm">AI Project Builder</Link></li>
              <li><Link to="/roadmap" className="text-white/50 hover:text-white transition text-sm">Galaxy Roadmaps</Link></li>
              <li><Link to="/study-guide" className="text-white/50 hover:text-white transition text-sm">Knowledge Library</Link></li>
              <li><Link to="/job-prep" className="text-white/50 hover:text-white transition text-sm">Interview Simulator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Network</h4>
            <ul className="space-y-4">
              <li><Link to="/collaboration" className="text-white/50 hover:text-white transition text-sm">Find Teams</Link></li>
              <li><Link to="/mentor" className="text-white/50 hover:text-white transition text-sm">Holographic Mentor</Link></li>
              <li><Link to="/dashboard" className="text-white/50 hover:text-white transition text-sm">Mission Control</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-white transition text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-mono">
            © 2050 ProjectSpark OS. All systems nominal.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-white/50 font-mono">API Status: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

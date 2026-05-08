import { ExternalLink, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 pb-8 px-4 relative z-20"> {/* Added z-20 to ensure it's on top */}
      <div className="max-w-4xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        <div className="glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌤️</span>
                <span className="font-display font-bold text-white text-lg">SkyCast</span>
                <span className="glass rounded-full px-2 py-0.5 text-xs font-mono text-blue-300 border border-blue-400/20">v1.0</span>
              </div>
              <p className="text-white/40 text-sm font-body">
                Built by <span className="text-white/70 font-semibold">Zermine Wajid</span> for PM Accelerator
              </p>
            </div>

            <div className="flex-1 max-w-md">
              <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">About PM Accelerator</p>
              <p className="text-white/50 text-xs font-body leading-relaxed">
                PM Accelerator is a leading product management career accelerator helping aspiring PMs break into top tech companies through mentorship, live projects, and community programs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/school/pmaccelerator/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass rounded-xl px-3 py-2 text-white/40 hover:text-blue-300 hover:bg-blue-400/10 transition-all text-xs font-body"
              >
                <ExternalLink size={13} />
                LinkedIn
              </a>
              <a
                href="https://github.com/zerminewajid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass rounded-xl px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/10 transition-all text-xs font-body"
              >
                <Code2 size={13} />
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-white/20 text-xs font-mono">AI Engineer Intern Assessment · Tech Assessment #1 (Frontend)</p>
            <p className="text-white/20 text-xs font-mono">Powered by OpenWeatherMap API</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

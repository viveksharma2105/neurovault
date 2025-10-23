export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
              NeuroVault
            </h3>
            <p className="text-sm text-slate-500">
              Your brain's second home
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
              Contact Us
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
              Help Center
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-slate-500">
            © {currentYear} NeuroVault. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>for better productivity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-900 text-surface-400 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">
              Neuro<span className="text-brand-400">Vault</span>
            </h3>
            <p className="text-sm text-surface-500">Your brain's second home</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Help</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-800 text-center">
          <p className="text-xs text-surface-500">
            &copy; {currentYear} NeuroVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

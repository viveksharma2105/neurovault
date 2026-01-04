import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoGifIcon } from "../icons/LogoIcon";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const openSignIn = () => {
    setAuthMode("signin");
    setIsModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setIsModalOpen(true);
  };

  const switchMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer group" onClick={() => navigate("/")}>
              <div className="transform group-hover:scale-110 transition-transform duration-300 scale-90 sm:scale-100">
                <LogoGifIcon />
              </div>
              <span className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent">
                NeuroVault
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={openSignIn}
                className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-200"
              >
                Sign In
              </button>
              <button
                onClick={openSignUp}
                className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </>
  );
};

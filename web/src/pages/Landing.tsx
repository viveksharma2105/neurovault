import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AuthModal } from "../components/AuthModal";

export const Landing = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        {/* Hero with Unique Gradient Background */}
        <section className="relative pt-24 pb-32 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 -right-48 w-96 h-96 bg-violet-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow animation-delay-4000"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-white/90 font-medium">Your Brain's Second Home</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="text-white">Capture Ideas.</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 animate-gradient">
                  Never Lose Them.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                A modern note-taking platform designed for creators, thinkers, and dreamers. 
                Store, organize, and share your thoughts with lightning-fast access across all devices.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openSignUp}
                  className="group relative px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 transition-all duration-300"
                >
                  <span className="relative z-10">Start For Free</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={openSignIn}
                  className="px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 text-white backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Sign In →
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>End-to-end encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
                Everything you need
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Powerful features designed to make note-taking a breeze
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-emerald-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Lightning Fast</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Instant syncing across all devices. Access your notes in milliseconds, no matter where you are.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-violet-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Smart Sharing</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Share notes with a single click. Collaborate seamlessly with your team or keep them private.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-cyan-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">End-to-end encryption</h3>
                  <p className="text-slate-600 leading-relaxed">
                    End-to-end encryption ensures your data stays private. We never read or share your notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to organize your mind?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of creators, developers, and thinkers who trust NeuroVault every day.
            </p>
            <button
              onClick={openSignUp}
              className="group relative px-10 py-5 text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Get Started Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Social Proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-2 border-slate-900"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 border-2 border-slate-900"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 border-2 border-slate-900"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-2 border-slate-900"></div>
              </div>
              <p className="text-sm">
                <span className="text-white font-semibold"> worldwide users</span> 
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />

      {/* Custom animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%; worl
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

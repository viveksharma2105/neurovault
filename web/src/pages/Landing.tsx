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
    <div className="min-h-screen flex flex-col bg-surface-0">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 px-4 sm:px-6 overflow-hidden bg-surface-900">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

          {/* Floating orbs */}
          <div className="hidden md:block absolute top-1/4 -left-32 w-80 h-80 bg-brand-500/20 rounded-full filter blur-3xl animate-float" />
          <div className="hidden md:block absolute top-1/3 -right-32 w-80 h-80 bg-accent-violet/20 rounded-full filter blur-3xl animate-float-delayed" />
          <div className="hidden md:block absolute bottom-1/4 left-1/2 w-64 h-64 bg-accent-cyan/15 rounded-full filter blur-3xl animate-float-slow" />

          <div className="relative max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
              </span>
              <span className="text-sm text-white/80 font-medium">Your Brain's Second Home</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] animate-fade-in-up">
              <span className="text-white">Capture Ideas.</span>
              <br />
              <span className="text-gradient animate-gradient-x" style={{ backgroundSize: "200% 200%" }}>
                Never Lose Them.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-surface-400 mb-10 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              A modern note-taking platform designed for creators, thinkers, and dreamers.
              Store, organize, and share your thoughts with lightning-fast access.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <button
                onClick={openSignUp}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-brand-600 text-white shadow-glow-sm hover:bg-brand-700 hover:shadow-glow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Start For Free
              </button>
              <button
                onClick={openSignIn}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-200"
              >
                Sign In
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-surface-500 text-sm px-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {["No credit card required", "Free forever plan", "End-to-end encrypted"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent-emerald" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-surface-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-surface-900">
                Everything you need
              </h2>
              <p className="text-surface-500 text-lg max-w-xl mx-auto">
                Powerful features designed to make note-taking a breeze
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Lightning Fast",
                  desc: "Instant syncing across all devices. Access your notes in milliseconds, no matter where you are.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                  color: "brand",
                },
                {
                  title: "Smart Sharing",
                  desc: "Share notes with a single click. Collaborate seamlessly with your team or keep them private.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  ),
                  color: "violet",
                },
                {
                  title: "Fully Secure",
                  desc: "End-to-end encryption ensures your data stays private. We never read or share your notes.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  ),
                  color: "cyan",
                },
              ].map(({ title, desc, icon, color }) => (
                <div
                  key={title}
                  className="card group p-6 md:p-8 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                      color === "brand"
                        ? "bg-brand-100 text-brand-600"
                        : color === "violet"
                        ? "bg-violet-100 text-violet-600"
                        : "bg-cyan-100 text-cyan-600"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-surface-900">{title}</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden bg-surface-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(76,110,245,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.08),transparent_50%)]" />

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 px-4">
              Ready to organize your mind?
            </h2>
            <p className="text-lg text-surface-400 mb-10 max-w-xl mx-auto px-4">
              Join thousands of creators, developers, and thinkers who trust NeuroVault every day.
            </p>
            <button
              onClick={openSignUp}
              className="px-10 py-4 text-base font-bold rounded-xl bg-brand-600 text-white shadow-glow-md hover:bg-brand-700 hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Get Started Now
            </button>

            {/* Social proof */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-surface-500">
              <div className="flex -space-x-2">
                {["brand", "violet", "cyan", "rose"].map((c) => (
                  <div
                    key={c}
                    className={`w-9 h-9 rounded-full border-2 border-surface-900 ${
                      c === "brand"
                        ? "bg-brand-400"
                        : c === "violet"
                        ? "bg-violet-400"
                        : c === "cyan"
                        ? "bg-cyan-400"
                        : "bg-rose-400"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm">
                <span className="text-white font-semibold">Worldwide users</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </div>
  );
};

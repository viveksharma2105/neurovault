import { useRef, useState, useEffect } from "react";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { LogoGifIcon } from "../icons/LogoIcon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup";
  onSwitchMode: () => void;
}

export function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError("");
      setSuccess(false);
      setLoading(false);
    }
  }, [isOpen, mode]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen && !loading) {
        handleSubmit();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [isOpen, loading, mode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setSuccess(false);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signin") {
        const res = await axios.post(BACKEND_URL + "/api/v1/signin", { username, password });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        await axios.post(BACKEND_URL + "/api/v1/signup", { username, password });
        setSuccess(true);
        setTimeout(() => onSwitchMode(), 2000);
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || `${mode === "signin" ? "Sign in" : "Sign up"} failed`);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-950/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-surface-200 pointer-events-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="mb-3">
                <LogoGifIcon />
              </div>
              <h2 className="text-2xl font-bold text-surface-900">
                {mode === "signin" ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-surface-500 text-sm mt-1">
                {mode === "signin" ? "Sign in to access your vault" : "Join NeuroVault today"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Username</label>
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder={mode === "signin" ? "Enter your username" : "Choose a username"}
                  className="input"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder={mode === "signin" ? "Enter your password" : "Create a password (min 6 chars)"}
                  className="input"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Account created! Switching to sign in...
                </div>
              )}

              <Button
                onClick={handleSubmit}
                loading={loading}
                size="lg"
                Variant="primary"
                title={loading ? (mode === "signin" ? "Signing in..." : "Creating account...") : (mode === "signin" ? "Sign In" : "Sign Up")}
                fullWidth={true}
              />

              {mode === "signup" && (
                <p className="text-surface-400 text-xs text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              )}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-surface-400">or</span>
                </div>
              </div>

              <p className="text-center text-sm text-surface-500">
                {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={onSwitchMode}
                  className="text-brand-600 hover:text-brand-700 font-semibold transition-colors duration-200"
                >
                  {mode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

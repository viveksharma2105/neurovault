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

  // Reset form when modal opens/closes or mode switches
  useEffect(() => {
    if (isOpen) {
      setError("");
      setSuccess(false);
      setLoading(false);
    }
  }, [isOpen, mode]);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen && !loading) {
        handleSubmit();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [isOpen, loading, mode]);

  // Prevent body scroll when modal is open
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
        const res = await axios.post(BACKEND_URL + "/api/v1/signin", {
          username,
          password,
        });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        await axios.post(BACKEND_URL + "/api/v1/signup", {
          username,
          password,
        });
        setSuccess(true);
        setTimeout(() => {
          onSwitchMode();
        }, 2000);
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
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-8 pointer-events-auto animate-modalSlideIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-3">
              <LogoGifIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600 text-center text-sm">
              {mode === "signin" ? "Sign in to access your vault" : "Join NeuroVault today"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                ref={usernameRef}
                type="text"
                placeholder={mode === "signin" ? "Enter your username" : "Choose a username"}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                autoFocus
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                ref={passwordRef}
                type="password"
                placeholder={mode === "signin" ? "Enter your password" : "Create a password"}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                ✓ Account created successfully! Switching to sign in...
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              loading={loading}
              size="lg"
              Variant="primary"
              title={loading ? (mode === "signin" ? "Signing in..." : "Creating account...") : (mode === "signin" ? "Sign In" : "Sign Up")}
              fullWidth={true}
            />

            {/* Terms (for signup only) */}
            {mode === "signup" && (
              <p className="text-gray-500 text-xs text-center">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            )}

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Switch Mode Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={onSwitchMode}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  {mode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </>
  );
}

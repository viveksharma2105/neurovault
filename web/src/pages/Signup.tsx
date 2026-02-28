import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { LogoGifIcon } from "../icons/LogoIcon";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function signup() {
    setLoading(true);
    setError("");
    setSuccess(false);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 bg-surface-50">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-brand-200/40 rounded-full filter blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-accent-cyan/10 rounded-full filter blur-3xl animate-float-delayed" />

      {/* Card */}
      <div className="relative w-full max-w-md animate-slide-up">
        <div className="bg-white rounded-2xl shadow-xl border border-surface-200 p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-3">
              <LogoGifIcon />
            </div>
            <h1 className="text-2xl font-bold text-surface-900">Create Account</h1>
            <p className="text-surface-500 text-sm mt-1">Join NeuroVault today</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Username</label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Choose a username"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Create a password"
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
                Account created! Redirecting to sign in...
              </div>
            )}

            <Button
              onClick={signup}
              loading={loading}
              size="lg"
              Variant="primary"
              title={loading ? "Creating account..." : "Sign Up"}
              fullWidth={true}
            />

            <p className="text-surface-400 text-xs text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-surface-400">or</span>
              </div>
            </div>

            <p className="text-center text-sm text-surface-500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-brand-600 hover:text-brand-700 font-semibold transition-colors duration-200"
              >
                Sign In
              </button>
            </p>

            <div className="text-center pt-1">
              <button
                onClick={() => navigate("/")}
                className="text-surface-400 hover:text-surface-600 text-sm transition-colors duration-200"
              >
                &larr; Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


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
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 bg-[rgba(255,255,255,0.35)]">
      {/* Muted Gradient Background (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20"></div>
      
      {/* Muted Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/30 rounded-full mix-blend-normal filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full mix-blend-normal filter blur-2xl opacity-25 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-white/20 rounded-full mix-blend-normal filter blur-2xl opacity-25 animate-blob animation-delay-4000"></div>

      {/* Frosted White Signup Box */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 p-8 sm:p-10 transform transition-all duration-300 hover:scale-[1.01]">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-3">
              <LogoGifIcon />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
            <p className="text-gray-700 text-center text-sm">Join NeuroVault today</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-800 mb-1">Username</label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Choose a username"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                ✓ Account created successfully! Redirecting to sign in...
              </div>
            )}

            {/* Sign Up Button */}
            <Button
              onClick={signup}
              loading={loading}
              size="lg"
              Variant="primary"
              title={loading ? "Creating account..." : "Sign Up"}
              fullWidth={true}
            />

            {/* Terms Notice */}
            <p className="text-gray-600 text-xs text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-700 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
                >
                  Sign In
                </button>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center pt-1">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}


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
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-purple-600 to-pink-500"></div>
      
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Frosted Glass Signup Box */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transform transition-all duration-300 hover:scale-[1.02]">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4 transform transition-transform hover:scale-110 duration-300">
              <LogoGifIcon />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/80 text-center">Join NeuroVault today</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Username Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-white/90 mb-2">Username</label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Choose a username"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-red-100 px-4 py-3 rounded-xl text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/50 text-green-100 px-4 py-3 rounded-xl text-sm animate-bounce">
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
            <p className="text-white/60 text-xs text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-white/30"></div>
              <span className="px-4 text-white/70 text-sm">or</span>
              <div className="flex-1 border-t border-white/30"></div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-white/80 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="text-yellow-200 hover:text-yellow-100 font-semibold transition-colors duration-300 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center pt-2">
              <button
                onClick={() => navigate("/")}
                className="text-white/70 hover:text-white text-sm transition-colors duration-300"
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

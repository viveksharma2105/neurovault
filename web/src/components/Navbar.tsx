import { useNavigate } from "react-router-dom";
import { LogoGifIcon } from "../icons/LogoIcon";
import { Button } from "./Button";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <LogoGifIcon />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              NeuroVault
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              Variant="secondary"
              title="Sign In"
              size="md"
              onClick={() => navigate("/signin")}
            />
            <Button
              Variant="primary"
              title="Sign Up"
              size="md"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

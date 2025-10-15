
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signin() {
    setLoading(true);
    setError("");
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const res = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });
      // Save token, redirect, etc.
      localStorage.setItem("token", res.data.token);
  alert("Signed in successfully!");
  window.location.href = "/dashboard";
    } catch (e: any) {
      setError(e?.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input refrence={usernameRef} placeholder="Username" />
        <Input refrence={passwordRef} placeholder="Password" />
        {error && <div className="text-red-500 text-sm pb-2">{error}</div>}
        <div className="justify-center flex pt-4">
          <Button
            onClick={signin}
            loading={loading}
            size="md"
            Variant="primary"
            title="Signin"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

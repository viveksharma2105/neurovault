
import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function CreateContentModal({ open, onClose, onContentAdded }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    // Simple type detection
    let type = "article";
    if (link?.includes("youtube.com")) type = "video";
    if (link?.includes("twitter.com") || link?.includes("x.com")) type = "image";
    try {
      await axios.post(
        BACKEND_URL + "/api/v1/content",
        { title, link, type },
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      if (onContentAdded) onContentAdded();
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to add content");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex justify-center flex-col">
            <span className="bg-white p-4 rounded-lg ">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon size="lg" />
                </div>
              </div>
              <div>
                <Input refrence={titleRef} placeholder={"Title"} />
                <Input refrence={linkRef} placeholder={"Links"} />
              </div>
              {error && <div className="text-red-500 text-sm pb-2">{error}</div>}
              <div className="flex justify-center p-4">
                <Button size="md" Variant="primary" title="Submit" loading={loading} onClick={handleSubmit} />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


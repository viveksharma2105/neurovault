import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function CreateContentModal({ open, onClose, onContentAdded }: { open: boolean; onClose: () => void; onContentAdded?: () => void }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState<"link" | "text">("link");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const textContent = contentRef.current?.value;

    if (!title) {
      setError("Please enter a title");
      setLoading(false);
      return;
    }

    if (selectedType !== "text" && !link) {
      setError("Please enter a link");
      setLoading(false);
      return;
    }

    if (selectedType === "text" && !textContent) {
      setError("Please enter some content");
      setLoading(false);
      return;
    }

    let type = "article";
    if (selectedType === "text") {
      type = "text";
    } else {
      if (link?.includes("youtube.com") || link?.includes("youtu.be")) type = "video";
      else if (link?.includes("twitter.com") || link?.includes("x.com")) type = "image";
      else if (link?.includes("reddit.com")) type = "reddit";
    }

    try {
      const payload: any = {
        title,
        type,
        link: selectedType === "text" ? "" : link,
        content: selectedType === "text" ? textContent : "",
      };

      await axios.post(BACKEND_URL + "/api/v1/content", payload, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      if (onContentAdded) onContentAdded();
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      if (contentRef.current) contentRef.current.value = "";
      setSelectedType("link");
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to add content");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-surface-200 max-w-md w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-100">
          <div>
            <h2 className="text-lg font-bold text-surface-900">Create New Note</h2>
            <p className="text-xs text-surface-400 mt-0.5">Add a note to your vault</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-all duration-200"
          >
            <CrossIcon size="lg" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Note Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedType("link")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  selectedType === "link"
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-surface-200 hover:border-surface-300 text-surface-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Link
              </button>
              <button
                type="button"
                onClick={() => setSelectedType("text")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  selectedType === "text"
                    ? "border-accent-emerald bg-emerald-50 text-emerald-700"
                    : "border-surface-200 hover:border-surface-300 text-surface-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Text Note
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Title</label>
            <input ref={titleRef} type="text" placeholder="Enter note title" className="input" />
          </div>

          {/* Content based on type */}
          {selectedType === "text" ? (
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Content</label>
              <textarea
                ref={contentRef}
                rows={5}
                placeholder="Write your note here..."
                className="input resize-none"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Link</label>
                <input ref={linkRef} type="url" placeholder="https://example.com" className="input" />
              </div>
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-3">
                <p className="text-xs text-brand-600">
                  <span className="font-semibold">Auto-detect:</span> YouTube, Twitter/X, Reddit links are automatically categorized.
                </p>
              </div>
            </>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-surface-100 bg-surface-50/50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            size="md"
            Variant="primary"
            title={loading ? "Creating..." : "Create Note"}
          />
        </div>
      </div>
    </div>
  );
}

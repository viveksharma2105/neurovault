
import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function CreateContentModal({ open, onClose, onContentAdded }) {
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

    // Determine type based on selection and link
    let type = "article";
    
    if (selectedType === "text") {
      type = "text";
    } else {
      // Auto-detect for link type
      if (link?.includes("youtube.com") || link?.includes("youtu.be")) type = "video";
      else if (link?.includes("twitter.com") || link?.includes("x.com")) type = "image";
      else if (link?.includes("reddit.com")) type = "reddit";
    }
    
    try {
      const payload: any = { 
        title, 
        type,
        link: selectedType === "text" ? "" : link,
        content: selectedType === "text" ? textContent : ""
      };
      
      await axios.post(
        BACKEND_URL + "/api/v1/content",
        payload,
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      if (onContentAdded) onContentAdded();
      // Reset form
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Note</h2>
            <p className="text-sm text-gray-500 mt-1">Add a new note to your vault</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close"
          >
            <CrossIcon size="lg" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Note Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedType("link")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedType === "link"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-purple-300 text-gray-600"
                }`}
              >
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm font-medium">Link</span>
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedType("text")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedType === "text"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-green-300 text-gray-600"
                }`}
              >
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">Text Note</span>
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter note title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Conditional Content Based on Type */}
          {selectedType === "text" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={contentRef}
                rows={6}
                placeholder="Write your note here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link <span className="text-red-500">*</span>
                </label>
                <input
                  ref={linkRef}
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">💡 Auto-detect:</span> We'll automatically detect YouTube videos, Twitter posts, Reddit posts, or articles.
                </p>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            size="lg"
            Variant="primary"
            title={loading ? "Creating..." : "Create Note"}
          />
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
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


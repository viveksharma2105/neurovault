import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const typeBadge: Record<string, string> = {
  video: "bg-red-50 text-red-700 border-red-200",
  image: "bg-blue-50 text-blue-700 border-blue-200",
  reddit: "bg-orange-50 text-orange-700 border-orange-200",
  text: "bg-emerald-50 text-emerald-700 border-emerald-200",
  article: "bg-teal-50 text-teal-700 border-teal-200",
};

function getTypeBadge(type: string) {
  return typeBadge[type] || "bg-brand-50 text-brand-700 border-brand-200";
}

export function SharedView() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [content, setContent] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSharedContent();
  }, [shareLink]);

  async function fetchSharedContent() {
    try {
      setLoading(true);
      const res = await axios.get(BACKEND_URL + "/api/v1/neuro/" + shareLink);
      setUsername(res.data.username);
      setContent(res.data.content);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to load shared content");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="text-center animate-fade-in">
          <svg className="animate-spin h-8 w-8 text-brand-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-surface-500 text-sm">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="text-center max-w-md animate-fade-in-up">
          <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-surface-900 mb-2">Content Not Found</h1>
          <p className="text-surface-500 text-sm mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      <Navbar />

      <main className="flex-grow pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="card p-6 mb-6 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-surface-900">
                  {username}'s Shared Vault
                </h1>
                <p className="text-surface-400 text-sm">
                  {content.length} {content.length === 1 ? "note" : "notes"} shared
                </p>
              </div>
            </div>
          </div>

          {/* Grid */}
          {content.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-surface-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-surface-500">No content shared yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.map((item: any) => (
                <div
                  key={item._id}
                  className="card overflow-hidden animate-fade-in-up"
                >
                  {/* Header */}
                  <div className="p-5 border-b border-surface-100">
                    <h3 className="text-base font-semibold text-surface-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <span className={`badge border text-[11px] ${getTypeBadge(item.type)}`}>
                      {item.type || "note"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {item.type === "video" && item.link && (
                      <div className="aspect-video bg-surface-100 rounded-xl overflow-hidden mb-3">
                        <iframe
                          className="w-full h-full"
                          src={item.link.replace("watch", "embed").replace("?v=", "/")}
                          title="Video preview"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {item.type === "image" && item.link && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          View on Twitter/X
                        </a>
                      </div>
                    )}

                    {item.type === "reddit" && item.link && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline text-sm font-medium flex items-center gap-1.5"
                        >
                          View on Reddit
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}

                    {item.type === "text" && item.content && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
                        <p className="text-surface-700 text-sm whitespace-pre-wrap line-clamp-6">
                          {item.content}
                        </p>
                      </div>
                    )}

                    {item.type === "article" && item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline text-sm break-all flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {item.link}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

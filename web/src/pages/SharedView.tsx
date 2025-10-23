import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Content Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {username}'s Shared Vault
                </h1>
                <p className="text-slate-600 text-sm">
                  {content.length} {content.length === 1 ? "note" : "notes"} shared
                </p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          {content.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-slate-600 text-lg">No content shared yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === "video"
                          ? "bg-red-100 text-red-800"
                          : item.type === "image"
                          ? "bg-blue-100 text-blue-800"
                          : item.type === "reddit"
                          ? "bg-orange-100 text-orange-800"
                          : item.type === "text"
                          ? "bg-green-100 text-green-800"
                          : item.type === "article"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.type || "note"}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* YouTube Video */}
                    {item.type === "video" && item.link && (
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                        <iframe
                          className="w-full h-full"
                          src={item.link.replace("watch", "embed").replace("?v=", "/")}
                          title="Video preview"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {/* Twitter/X Post */}
                    {item.type === "image" && item.link && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View on Twitter/X →
                        </a>
                      </div>
                    )}

                    {/* Reddit Post */}
                    {item.type === "reddit" && item.link && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline text-sm flex items-center gap-2"
                        >
                          <span>View on Reddit</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}

                    {/* Text Note */}
                    {item.type === "text" && item.content && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                        <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-6">
                          {item.content}
                        </p>
                      </div>
                    )}

                    {/* Article/Link */}
                    {item.type === "article" && item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm break-all flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function SingleSharedView() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [content, setContent] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSharedContent();
  }, [shareLink]);

  async function fetchSharedContent() {
    try {
      setLoading(true);
      const res = await axios.get(BACKEND_URL + "/api/v1/content/shared/" + shareLink);
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
          <p className="text-slate-600">Loading shared note...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Note Not Found</h1>
          <p className="text-slate-600 mb-6">{error || "This note doesn't exist or has been removed"}</p>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-slate-600">Shared by</p>
                <h2 className="text-lg font-bold text-slate-900">{username}</h2>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900">{content.title}</h1>
                <span
                  className={`flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    content.type === "video"
                      ? "bg-red-100 text-red-800"
                      : content.type === "image"
                      ? "bg-blue-100 text-blue-800"
                      : content.type === "reddit"
                      ? "bg-orange-100 text-orange-800"
                      : content.type === "text"
                      ? "bg-green-100 text-green-800"
                      : content.type === "article"
                      ? "bg-teal-100 text-teal-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {content.type || "note"}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {/* YouTube Video */}
              {content.type === "video" && content.link && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={content.link.replace("watch", "embed").replace("?v=", "/")}
                    title="Video preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Twitter/X Post */}
              {content.type === "image" && content.link && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <h3 className="text-lg font-semibold text-blue-900">Twitter/X Post</h3>
                  </div>
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View on Twitter/X
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              {/* Reddit Post */}
              {content.type === "reddit" && content.link && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    <h3 className="text-lg font-semibold text-orange-900">Reddit Post</h3>
                  </div>
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    View on Reddit
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              {/* Text Note */}
              {content.type === "text" && content.content && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-green-900">Text Note</h3>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-800 whitespace-pre-wrap">{content.content}</p>
                  </div>
                </div>
              )}

              {/* Article/Link */}
              {content.type === "article" && content.link && (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <h3 className="text-lg font-semibold text-teal-900">Link</h3>
                  </div>
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 break-all font-medium underline"
                  >
                    {content.link}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Want to create your own notes?</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Get Started with NeuroVault
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

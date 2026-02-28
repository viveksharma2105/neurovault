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
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="text-center animate-fade-in">
          <svg className="animate-spin h-8 w-8 text-brand-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-surface-500 text-sm">Loading shared note...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="text-center max-w-md animate-fade-in-up">
          <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-surface-900 mb-2">Note Not Found</h1>
          <p className="text-surface-500 text-sm mb-6">{error || "This note doesn't exist or has been removed"}</p>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="card p-5 mb-6 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-surface-400">Shared by</p>
                <h2 className="text-base font-bold text-surface-900">{username}</h2>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="card overflow-hidden shadow-md animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {/* Card Header */}
            <div className="p-6 border-b border-surface-100">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-xl font-bold text-surface-900">{content.title}</h1>
                <span className={`badge border text-[11px] flex-shrink-0 ${getTypeBadge(content.type)}`}>
                  {content.type || "note"}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {content.type === "video" && content.link && (
                <div className="aspect-video bg-surface-100 rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={content.link.replace("watch", "embed").replace("?v=", "/")}
                    title="Video preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {content.type === "image" && content.link && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <h3 className="text-base font-semibold text-blue-900">Twitter/X Post</h3>
                  </div>
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    View on Twitter/X
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              {content.type === "reddit" && content.link && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
                    </svg>
                    <h3 className="text-base font-semibold text-orange-900">Reddit Post</h3>
                  </div>
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 transition-colors"
                  >
                    View on Reddit
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              {content.type === "text" && content.content && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-base font-semibold text-emerald-900">Text Note</h3>
                  </div>
                  <p className="text-surface-700 whitespace-pre-wrap">{content.content}</p>
                </div>
              )}

              {content.type === "article" && content.link && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <h3 className="text-base font-semibold text-teal-900">Link</h3>
                  </div>
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 break-all font-medium underline text-sm"
                  >
                    {content.link}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-surface-400 text-sm mb-4">Want to create your own notes?</p>
            <a
              href="/"
              className="inline-block px-6 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcone } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { SearchBar } from "../components/SearchBar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { LogoGifIcon } from "../icons/LogoIcon";

interface Analytics {
  totalContent: number;
  contentByType: { _id: string; count: number }[];
}

// ─── Type badge helper ───────────────────────────────────────────────
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

// ─── NoteCard ────────────────────────────────────────────────────────
function NoteCard({
  item,
  onDelete,
  onEdit,
  onShare,
}: {
  item: any;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
  onShare: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title || "Untitled");

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(item.title || "Untitled");
    setIsEditing(false);
  };

  return (
    <div className="card group overflow-hidden hover:-translate-y-0.5 animate-fade-in-up">
      {/* Header */}
      <div className="p-5 border-b border-surface-100">
        <div className="flex items-start justify-between gap-2">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") handleCancelEdit();
              }}
              className="text-base font-semibold text-surface-800 flex-1 pr-2 border-b-2 border-brand-500 focus:outline-none bg-transparent"
              autoFocus
            />
          ) : (
            <h3 className="text-base font-semibold text-surface-800 line-clamp-2 flex-1 pr-2">
              {item.title || "Untitled"}
            </h3>
          )}

          {/* Actions */}
          <div className="flex gap-0.5 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="p-1.5 text-accent-emerald hover:bg-emerald-50 rounded-lg transition-colors"
                  aria-label="Save"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1.5 text-surface-400 hover:bg-surface-100 rounded-lg transition-colors"
                  aria-label="Cancel"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={onShare}
                  className="p-1.5 text-surface-400 hover:text-accent-emerald hover:bg-emerald-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Share"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button
                  onClick={onDelete}
                  className="p-1.5 text-surface-400 hover:text-accent-rose hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Badge */}
        <span className={`badge mt-2.5 border text-[11px] ${getTypeBadge(item.type)}`}>
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
          <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden mb-3">
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={item.link.replace("x.com", "twitter.com")}> </a>
            </blockquote>
          </div>
        )}

        {item.type === "reddit" && item.link && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-3">
            <div className="flex items-center gap-2 text-orange-700 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
              </svg>
              Reddit Post
            </div>
          </div>
        )}

        {item.type === "text" && item.content && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
            <p className="text-surface-700 text-sm whitespace-pre-wrap line-clamp-4">{item.content}</p>
          </div>
        )}

        {item.type === "article" && item.link && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-3">
            <div className="flex items-center gap-2 text-teal-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Article
            </div>
          </div>
        )}

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-600 hover:text-brand-700 hover:underline truncate block"
          >
            {item.link.length > 45 ? item.link.substring(0, 45) + "..." : item.link}
          </a>
        )}
      </div>

      {/* Footer actions — visible on hover */}
      <div className="px-5 pb-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-brand-50 text-brand-600 rounded-lg hover:bg-brand-100 transition-colors text-sm font-medium text-center"
          >
            Open
          </a>
        )}
        <button
          onClick={() => {
            const shareUrl = item.link || window.location.href;
            navigator.clipboard.writeText(shareUrl);
          }}
          className="px-3 py-2 bg-surface-50 text-surface-500 rounded-lg hover:bg-surface-100 transition-colors"
          aria-label="Copy link"
        >
          <ShareIcone size="md" />
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────
export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [showShareModal, setShowShareModal] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const navigate = useNavigate();

  async function fetchContent() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(BACKEND_URL + "/api/v1/content", {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setContent(res.data.content || []);
    } catch (e: any) {
      setError("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  }

  async function fetchAnalytics() {
    try {
      const res = await axios.get(BACKEND_URL + "/api/v1/analytics", {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setAnalytics(res.data);
    } catch (e: any) {
      console.error("Failed to fetch analytics");
    }
  }

  async function handleSearch(query: string, type: string, sortBy: string) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (type !== "all") params.append("type", type);
      params.append("sortBy", sortBy);
      const order = sortBy === "title" ? "asc" : "desc";
      params.append("order", order);

      const res = await axios.get(
        BACKEND_URL + "/api/v1/content/search?" + params.toString(),
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      setContent(res.data.content || []);
    } catch (e: any) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
    fetchAnalytics();
  }, []);

  async function handleShare() {
    setShareLoading(true);
    setShareLink("");
    try {
      const res = await axios.post(
        BACKEND_URL + "/api/v1/neuro/share",
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      setShareLink(window.location.origin + "/shared/" + res.data.hash);
      setShowShareModal(true);
    } catch (e: any) {
      setError("Failed to share");
    } finally {
      setShareLoading(false);
    }
  }

  function handleSidebarFilter(type: string) {
    setFilter(type);
    let contentType = "all";
    if (type === "twitter") contentType = "image";
    else if (type === "youtube") contentType = "video";
    else if (type === "reddit") contentType = "reddit";
    else if (type === "document") contentType = "article";
    else if (type === "links") contentType = "links";
    else contentType = type;

    handleSearch("", contentType, "createdAt");
  }

  const filteredContent = content;

  async function handleDeleteContent(id: string) {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(BACKEND_URL + "/api/v1/content/" + id, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setContent((prev) => prev.filter((item: any) => item._id !== id));
      fetchAnalytics();
    } catch (e: any) {
      setError("Failed to delete content");
    }
  }

  async function handleEditContent(id: string, newTitle: string) {
    try {
      await axios.put(
        BACKEND_URL + "/api/v1/content/" + id,
        { title: newTitle },
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      setContent((prev: any[]) =>
        prev.map((item: any) =>
          item._id === id ? { ...item, title: newTitle } : item
        )
      );
    } catch (e: any) {
      setError("Failed to update content");
    }
  }

  async function handleShareSingleContent(id: string) {
    try {
      const res = await axios.post(
        BACKEND_URL + "/api/v1/content/" + id + "/share",
        {},
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      const singleShareLink = window.location.origin + "/note/" + res.data.hash;
      navigator.clipboard.writeText(singleShareLink);
    } catch (e: any) {
      setError("Failed to share content");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar
        onFilter={handleSidebarFilter}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top nav */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-surface-200/60">
          <div className="px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Mobile hamburger */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <LogoGifIcon />
                <div>
                  <h1 className="text-xl font-bold text-surface-900">My Vault</h1>
                  <p className="text-xs text-surface-400">Manage your notes</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-surface-500 hover:text-accent-rose hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <CreateContentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onContentAdded={() => {
              fetchContent();
              fetchAnalytics();
            }}
          />

          {/* Analytics */}
          {analytics && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="card p-5">
                <p className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-1">Total Notes</p>
                <p className="text-2xl font-bold text-surface-900">{analytics.totalContent}</p>
              </div>
              <div className="card p-5">
                <p className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-1">Content Types</p>
                <p className="text-2xl font-bold text-surface-900">{analytics.contentByType?.length || 0}</p>
              </div>
            </div>
          )}

          {/* Search */}
          <SearchBar onSearch={handleSearch} />

          {/* Action bar */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-surface-900">
                {filter === "all" ? "All Notes" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </h2>
              <p className="text-sm text-surface-400 mt-0.5">
                {filteredContent.length} {filteredContent.length === 1 ? "note" : "notes"} found
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setModalOpen(true)}
                Variant="primary"
                size="md"
                startIcon={<PlusIcon size="md" />}
                title="New Note"
              />
              <Button
                onClick={handleShare}
                loading={shareLoading}
                Variant="secondary"
                size="md"
                startIcon={<ShareIcone size="md" />}
                title="Share All"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-8 w-8 text-brand-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <svg className="mx-auto h-16 w-16 text-surface-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-surface-700 mb-1">No notes yet</h3>
              <p className="text-surface-400 text-sm mb-6">Start by creating your first note</p>
              <Button
                onClick={() => setModalOpen(true)}
                Variant="primary"
                size="md"
                startIcon={<PlusIcon size="md" />}
                title="Create Note"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredContent.map((item: any) => (
                <NoteCard
                  key={item._id}
                  item={item}
                  onDelete={() => handleDeleteContent(item._id)}
                  onEdit={(newTitle) => handleEditContent(item._id, newTitle)}
                  onShare={() => handleShareSingleContent(item._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Share modal */}
      {showShareModal && shareLink && (
        <div className="fixed inset-0 bg-surface-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-surface-200 p-6 max-w-md w-full animate-slide-up">
            <h3 className="text-lg font-bold text-surface-900 mb-2">Share Your Vault</h3>
            <p className="text-sm text-surface-500 mb-4">Anyone with this link can view your shared notes:</p>
            <div className="bg-surface-50 border border-surface-200 rounded-xl p-3 mb-4 break-all text-sm text-surface-600 font-mono">
              {shareLink}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(shareLink)}
                className="flex-1 px-4 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2.5 bg-surface-100 text-surface-600 text-sm font-medium rounded-xl hover:bg-surface-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcone } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { LogoGifIcon } from "../icons/LogoIcon";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [showShareModal, setShowShareModal] = useState(false);
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

  useEffect(() => {
    fetchContent();
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
  }

  
  const filteredContent = filter === "all"
    ? content
    : content.filter((item: any) => {
        if (filter === "twitter") return item.type === "image";
        if (filter === "youtube") return item.type === "video";
        if (filter === "reddit") return item.type === "reddit";
        if (filter === "document") return item.type === "article";
        if (filter === "links") return item.type === "audio";
        return true;
      });

  async function handleDeleteContent(id: string) {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      await axios.delete(BACKEND_URL + "/api/v1/content/" + id, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setContent((prev) => prev.filter((item: any) => item._id !== id));
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
      copyToClipboard(singleShareLink);
      alert("Share link copied to clipboard!");
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
    alert("Link copied to clipboard!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Sidebar onFilter={handleSidebarFilter} />
      
      {/* Top Navbar */}
      <div className="ml-0 lg:ml-72">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LogoGifIcon />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    My Vault
                  </h1>
                  <p className="text-sm text-gray-500">Manage your notes</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <CreateContentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onContentAdded={fetchContent}
          />

          {/* Action Bar */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                {filter === "all" ? "All Notes" : `${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
              </h2>
              <p className="text-gray-600">
                {filteredContent.length} {filteredContent.length === 1 ? 'note' : 'notes'} found
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => setModalOpen(true)}
                Variant="primary"
                size="lg"
                startIcon={<PlusIcon size="lg" />}
                title="New Note"
              />
              <Button
                onClick={handleShare}
                loading={shareLoading}
                Variant="secondary"
                size="lg"
                startIcon={<ShareIcone size="lg" />}
                title="Share All"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Content Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-4">
                <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No notes yet</h3>
              <p className="text-gray-500 mb-6">Start by creating your first note</p>
              <Button
                onClick={() => setModalOpen(true)}
                Variant="primary"
                size="lg"
                startIcon={<PlusIcon size="lg" />}
                title="Create Note"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Share Link Modal */}
      {showShareModal && shareLink && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full transform transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Share Your Vault</h3>
            <p className="text-gray-600 mb-4">Anyone with this link can view your shared notes:</p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4 break-all text-sm text-gray-700">
              {shareLink}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => copyToClipboard(shareLink)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
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

// Modern Note Card Component
function NoteCard({ item, onDelete, onEdit, onShare }: { item: any; onDelete: () => void; onEdit: (newTitle: string) => void; onShare: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
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
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") handleCancelEdit();
              }}
              className="text-lg font-semibold text-gray-800 flex-1 pr-2 border-b-2 border-purple-500 focus:outline-none"
              autoFocus
            />
          ) : (
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 pr-2">
              {item.title || "Untitled"}
            </h3>
          )}
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-700 transition-colors duration-300 p-1"
                  aria-label="Save"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
                  aria-label="Cancel"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300 p-1"
                  aria-label="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={onShare}
                  className="text-gray-400 hover:text-green-500 transition-colors duration-300 p-1"
                  aria-label="Share"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button
                  onClick={onDelete}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1"
                  aria-label="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Type Badge */}
        <div className="mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.type === "video" ? "bg-red-100 text-red-800" :
            item.type === "image" ? "bg-blue-100 text-blue-800" :
            item.type === "reddit" ? "bg-orange-100 text-orange-800" :
            item.type === "text" ? "bg-green-100 text-green-800" :
            item.type === "article" ? "bg-teal-100 text-teal-800" :
            "bg-purple-100 text-purple-800"
          }`}>
            {item.type || "note"}
          </span>
        </div>
      </div>

      {/* Card Content Preview */}
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden mb-3">
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={item.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}

        {/* Reddit Post */}
        {item.type === "reddit" && item.link && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
            <div className="flex items-center space-x-2 text-orange-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              <span className="text-sm font-medium">Reddit Post</span>
            </div>
          </div>
        )}

        {/* Text Note */}
        {item.type === "text" && item.content && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
            <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-4">
              {item.content}
            </p>
          </div>
        )}

        {/* Article/Link Preview */}
        {item.type === "article" && item.link && (
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-3">
            <div className="flex items-center space-x-2 text-teal-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium">Article</span>
            </div>
          </div>
        )}
        
        {/* Link Preview */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block"
          >
            {item.link.length > 40 ? item.link.substring(0, 40) + "..." : item.link}
          </a>
        )}
      </div>

      {/* Card Footer with Actions */}
      <div className={`px-5 pb-5 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-300 text-sm font-medium text-center"
          >
            Open
          </a>
        )}
        <button
          onClick={() => {
            const shareUrl = item.link || window.location.href;
            navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard!");
          }}
          className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          aria-label="Share"
        >
          <ShareIcone size="md" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

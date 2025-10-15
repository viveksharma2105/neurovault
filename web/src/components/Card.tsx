import { useState, useEffect } from "react";
import { ShareIcone } from "../icons/ShareIcon";
import { CrossIcon } from "../icons/CrossIcon";

export interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "reddit";
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}

export function Card({ title, link, type, onDelete, onEdit }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSaveEdit = () => {
    if (editTitle.trim() && onEdit) {
      onEdit(editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  useEffect(() => {
    // Reload Twitter widgets when card mounts or type changes
    if (type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type]);

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="text-purple-500 mt-1">
              <ShareIcone size="md" />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") handleCancelEdit();
                }}
                className="text-lg font-semibold text-gray-800 flex-1 border-b-2 border-purple-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
                {title}
              </h3>
            )}
          </div>
          
          <div className="flex gap-1 ml-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-700 transition-colors duration-300 p-1"
                  aria-label="Save"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
                  aria-label="Cancel"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                {onEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300 p-1"
                    aria-label="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                )}
                {onDelete && (
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1"
                    onClick={onDelete}
                    aria-label="Delete"
                  >
                    <CrossIcon size="md" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Type Badge */}
        <div className="mt-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            type === "youtube" ? "bg-red-100 text-red-700" : 
            type === "reddit" ? "bg-orange-100 text-orange-700" :
            "bg-blue-100 text-blue-700"
          }`}>
            {type === "youtube" ? "Video" : type === "reddit" ? "Reddit" : "Tweet"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {type === "youtube" && (
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
            <iframe
              className="w-full h-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
        
        {type === "twitter" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden mb-4">
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}

        {type === "reddit" && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-2 text-orange-700">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              <span className="text-sm font-semibold">Reddit Post</span>
            </div>
          </div>
        )}
        
        {/* Link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block"
        >
          {link.length > 50 ? link.substring(0, 50) + "..." : link}
        </a>
      </div>

      {/* Card Footer - Appears on Hover */}
      <div className={`px-5 pb-5 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm font-medium text-center"
        >
          Open Full Content
        </a>
      </div>
    </div>
  );
}

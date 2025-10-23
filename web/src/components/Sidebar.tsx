import { useState } from "react";
import { DocumentGifIcon } from "../icons/DocumentIcon";
import { LinkGifIcon } from "../icons/LinkIcon";
import { LogoGifIcon } from "../icons/LogoIcon";
import { TwitterGifIcon } from "../icons/TwitterIcon";
import { YoutubeGifIcon } from "../icons/YouTubeIcon";
import { RedditGifIcon } from "../icons/RedditIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({ onFilter }: { onFilter?: (type: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (type: string) => {
    setActiveFilter(type);
    onFilter && onFilter(type);
  };

  // NOTE: This sidebar component has hardcoded filter types (twitter, youtube, reddit, document, links)
  // The actual content types in the database are: ['image', 'video', 'article', 'audio', 'text', 'reddit']
  // TODO: Update sidebar filters to match actual content types or make it dynamic based on content types
  // Current implementation may not filter correctly for some content types

  return (
    <div className="h-screen bg-gradient-to-b from-white to-purple-50 border-r border-gray-200 w-72 fixed left-0 top-0 shadow-xl z-50 hidden lg:block">
      {/* Logo Section */}
      <div className="flex items-center gap-3 text-2xl p-6 border-b border-gray-200">
        <LogoGifIcon />
        <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          NeuroVault
        </span>
      </div>

      {/* Navigation Section */}
      <div className="p-4 space-y-2">
        <div className="mb-6 mt-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
            Filter by Type
          </h3>
        </div>

        <div
          onClick={() => handleFilterClick("all")}
          className={`cursor-pointer transition-all duration-300 rounded-xl ${
            activeFilter === "all"
              ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg scale-105"
              : "hover:bg-gray-100"
          }`}
        >
          <SidebarItem 
            text="All Notes" 
            icon={<LogoGifIcon />} 
            isActive={activeFilter === "all"}
          />
        </div>

        <div
          onClick={() => handleFilterClick("twitter")}
          className={`cursor-pointer transition-all duration-300 rounded-xl ${
            activeFilter === "twitter"
              ? "bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg scale-105"
              : "hover:bg-gray-100"
          }`}
        >
          <SidebarItem 
            text="Twitter" 
            icon={<TwitterGifIcon />} 
            isActive={activeFilter === "twitter"}
          />
        </div>

        <div
          onClick={() => handleFilterClick("youtube")}
          className={`cursor-pointer transition-all duration-300 rounded-xl ${
            activeFilter === "youtube"
              ? "bg-gradient-to-r from-red-400 to-red-600 shadow-lg scale-105"
              : "hover:bg-gray-100"
          }`}
        >
          <SidebarItem 
            text="YouTube" 
            icon={<YoutubeGifIcon />} 
            isActive={activeFilter === "youtube"}
          />
        </div>

        <div
          onClick={() => handleFilterClick("reddit")}
          className={`cursor-pointer transition-all duration-300 rounded-xl ${
            activeFilter === "reddit"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg scale-105"
              : "hover:bg-gray-100"
          }`}
        >
          <SidebarItem 
            text="Reddit" 
            icon={<RedditGifIcon />} 
            isActive={activeFilter === "reddit"}
          />
        </div>

        <div
          onClick={() => handleFilterClick("document")}
          className={`cursor-pointer transition-all duration-300 rounded-xl ${
            activeFilter === "document"
              ? "bg-gradient-to-r from-green-400 to-green-600 shadow-lg scale-105"
              : "hover:bg-gray-100"
          }`}
        >
          <SidebarItem 
            text="Documents" 
            icon={<DocumentGifIcon />} 
            isActive={activeFilter === "document"}
          />
        </div>

        <div
          onClick={() => handleFilterClick("links")}
          className={`cursor-pointer transition-all duration-300 rounded-xl ${
            activeFilter === "links"
              ? "bg-gradient-to-r from-teal-400 to-teal-600 shadow-lg scale-105"
              : "hover:bg-gray-100"
          }`}
        >
          <SidebarItem 
            text="Links" 
            icon={<LinkGifIcon />} 
            isActive={activeFilter === "links"}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-700 font-medium mb-1">💡 Pro Tip</p>
          <p className="text-xs text-gray-600">
            Use filters to organize your notes by type
          </p>
        </div>
      </div>
    </div>
  );
}


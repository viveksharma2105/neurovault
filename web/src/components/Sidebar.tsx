import { useState } from "react";
import { DocumentGifIcon } from "../icons/DocumentIcon";
import { LinkGifIcon } from "../icons/LinkIcon";
import { LogoGifIcon } from "../icons/LogoIcon";
import { TwitterGifIcon } from "../icons/TwitterIcon";
import { YoutubeGifIcon } from "../icons/YouTubeIcon";
import { RedditGifIcon } from "../icons/RedditIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  onFilter?: (type: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const filters = [
  { type: "all", label: "All Notes", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 15.75V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
  { type: "twitter", label: "Twitter", icon: <TwitterGifIcon /> },
  { type: "youtube", label: "YouTube", icon: <YoutubeGifIcon /> },
  { type: "reddit", label: "Reddit", icon: <RedditGifIcon /> },
  { type: "document", label: "Documents", icon: <DocumentGifIcon /> },
  { type: "links", label: "Links", icon: <LinkGifIcon /> },
];

export function Sidebar({ onFilter, isOpen, onClose }: SidebarProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (type: string) => {
    setActiveFilter(type);
    onFilter && onFilter(type);
    onClose && onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-surface-950/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-surface-200 z-50
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 h-16 px-5 border-b border-surface-200">
          <LogoGifIcon />
          <span className="text-lg font-bold text-surface-900 tracking-tight">
            Neuro<span className="text-brand-600">Vault</span>
          </span>
        </div>

        {/* Filters */}
        <div className="p-3 mt-2">
          <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider px-3 mb-2">
            Filter by type
          </p>

          <div className="space-y-0.5">
            {filters.map(({ type, label, icon }) => (
              <div
                key={type}
                onClick={() => handleFilterClick(type)}
                className={`
                  cursor-pointer rounded-xl transition-all duration-200
                  ${activeFilter === type
                    ? "bg-brand-50 border border-brand-200"
                    : "hover:bg-surface-50 border border-transparent"
                  }
                `}
              >
                <SidebarItem
                  text={label}
                  icon={icon}
                  isActive={activeFilter === type}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tip */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-200 bg-surface-50/50">
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-3">
            <p className="text-xs font-medium text-brand-700 mb-0.5">Pro Tip</p>
            <p className="text-[11px] text-brand-600/70">
              Use filters to organize your notes by type
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

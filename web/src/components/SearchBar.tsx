import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, type: string, sortBy: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const handleSearch = () => {
    onSearch(searchQuery, selectedType, sortBy);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
      {/* Search Input */}
      <div className="flex-1 relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
        />
      </div>

      {/* Type Filter */}
      <select
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          onSearch(searchQuery, e.target.value, sortBy);
        }}
        className="px-3 py-2.5 bg-white border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none cursor-pointer"
      >
        <option value="all">All Types</option>
        <option value="links">Links</option>
        <option value="text">Text Notes</option>
        <option value="video">Videos</option>
        <option value="image">Tweets</option>
        <option value="reddit">Reddit</option>
        <option value="article">Articles</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          onSearch(searchQuery, selectedType, e.target.value);
        }}
        className="px-3 py-2.5 bg-white border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none cursor-pointer"
      >
        <option value="createdAt">Newest</option>
        <option value="title">Title A-Z</option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-all shadow-sm hover:shadow-md"
      >
        Search
      </button>

      {/* Clear */}
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            onSearch("", selectedType, sortBy);
          }}
          className="px-4 py-2.5 bg-surface-100 text-surface-600 text-sm font-medium rounded-xl hover:bg-surface-200 transition-all"
        >
          Clear
        </button>
      )}
    </div>
  );
}

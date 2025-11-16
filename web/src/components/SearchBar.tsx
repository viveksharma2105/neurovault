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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search Input */}
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search notes by title or content..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Type Filter */}
      <select
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          onSearch(searchQuery, e.target.value, sortBy);
        }}
        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white cursor-pointer"
      >
        <option value="all">All Types</option>
        <option value="links">🔗 Links (All URLs)</option>
        <option value="text">📝 Text Notes</option>
        <option value="video">🎥 Videos</option>
        <option value="image">🐦 Tweets</option>
        <option value="reddit">🔴 Reddit</option>
        <option value="article">📄 Articles</option>
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          onSearch(searchQuery, selectedType, e.target.value);
        }}
        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white cursor-pointer"
      >
        <option value="createdAt">Newest First</option>
        <option value="title">Title (A-Z)</option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
      >
        Search
      </button>

      {/* Clear Button */}
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            onSearch("", selectedType, sortBy);
          }}
          className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
        >
          Clear
        </button>
      )}
    </div>
  );
}

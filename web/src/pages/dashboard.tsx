
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcone } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import axios from "axios";


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");

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
      setShareLink(window.location.origin + "/api/v1/neuro/" + res.data.hash);
    } catch (e: any) {
      setError("Failed to share");
    } finally {
      setShareLoading(false);
    }
  }

  // Sidebar filter handler
  function handleSidebarFilter(type: string) {
    setFilter(type);
  }

  // Filter content by type
  const filteredContent = filter === "all"
    ? content
    : content.filter((item: any) => {
        if (filter === "twitter") return item.type === "image";
        if (filter === "youtube") return item.type === "video";
        if (filter === "document") return item.type === "article";
        if (filter === "links") return item.type === "audio";
        return true;
      });

  async function handleDeleteContent(id: string) {
    setLoading(true);
    setError("");
    try {
      await axios.delete(BACKEND_URL + "/api/v1/content/" + id, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setContent((prev) => prev.filter((item: any) => item._id !== id));
    } catch (e: any) {
      setError("Failed to delete content");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Sidebar onFilter={handleSidebarFilter} />
      <div className="p-4 ml-72 min-h-screen bg-grey-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onContentAdded={fetchContent}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            Variant="primary"
            size="lg"
            startIcon={<PlusIcon size="lg" />}
            title="Add Content"
          />
          <Button
            onClick={handleShare}
            loading={shareLoading}
            Variant="secondary"
            size="lg"
            startIcon={<ShareIcone size="lg" />}
            title="Share"
          />
        </div>
        {shareLink && (
          <div className="pt-4 pb-2 text-green-600">Shareable Link: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a></div>
        )}
        {error && <div className="text-red-500 text-sm pb-2">{error}</div>}
        <div className="flex gap-4 flex-wrap">
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredContent.map((item: any) => (
              <Card
                key={item._id}
                type={item.type === "video" ? "youtube" : item.type === "image" ? "twitter" : "twitter"}
                link={item.link}
                title={item.title || "Untitled"}
                onDelete={() => handleDeleteContent(item._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

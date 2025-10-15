//import { TwitterIcon } from "../icons/TwitterIcon";
import { DocumentGifIcon } from "../icons/DocumentIcon";
import { LinkGifIcon } from "../icons/LinkIcon";
import { LogoGifIcon } from "../icons/LogoIcon";
import { TwitterGifIcon } from "../icons/TwitterIcon";
import { YoutubeGifIcon } from "../icons/YouTubeIcon";
import { SidebarItem } from "./SidebarItem";





export function Sidebar({ onFilter }: { onFilter?: (type: string) => void }) {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex items-center gap-3 text-2xl pt-4">
        <LogoGifIcon />
        <span className="font-bold">NeuroVault</span>
      </div>
      <div className="pt-10">
        <div onClick={() => onFilter && onFilter("twitter")}> <SidebarItem text="Twitter" icon={<TwitterGifIcon />} /> </div>
        <div onClick={() => onFilter && onFilter("youtube")}> <SidebarItem text="YouTube" icon={<YoutubeGifIcon />} /> </div>
        <div onClick={() => onFilter && onFilter("document")}> <SidebarItem text="Document" icon={<DocumentGifIcon />} /> </div>
        <div onClick={() => onFilter && onFilter("links")}> <SidebarItem text="Links" icon={<LinkGifIcon />} /> </div>
        <div onClick={() => onFilter && onFilter("all")}> <SidebarItem text="All" icon={<LogoGifIcon />} /> </div>
      </div>
    </div>
  );
}


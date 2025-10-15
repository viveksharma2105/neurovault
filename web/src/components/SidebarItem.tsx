import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  isActive = false,
}: {
  text: string;
  icon: ReactElement;
  isActive?: boolean;
}) {
  return (
    <div className={`flex items-center py-3 px-4 transition-all duration-300 ${
      isActive 
        ? "text-white" 
        : "text-gray-700"
    }`}>
      <div className="mr-3">{icon}</div>
      <div className={`font-medium ${isActive ? "font-semibold" : ""}`}>{text}</div>
    </div>
  );
}

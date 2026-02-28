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
    <div
      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "text-brand-700 font-semibold"
          : "text-surface-600 hover:text-surface-800"
      }`}
    >
      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        {icon}
      </span>
      <span className="text-sm">{text}</span>
    </div>
  );
}

export interface IconProps {
  size: "sm" | "md" | "lg";
}

export const iconSizeVariants = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

// Keep old misspelled export for backward compat
export const iconSizeVarients = iconSizeVariants;

export { DocumentGifIcon as DocumentIcon } from "./DocumentIcon";
export { ShareIcone as ShareIcon } from "./ShareIcon";
export { LogoGifIcon } from "./LogoIcon";
export { RedditGifIcon } from "./RedditIcon";

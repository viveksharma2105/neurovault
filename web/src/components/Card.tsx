// Export dummy to prevent import errors if this file is still referenced somewhere
export const Card = () => null;
export interface CardProps {
  title: string;
  link: string;
  type: string;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  color?: string;
  image?: string;
  id_parent_category?: number | null;
  created_at?: string;
  updated_at?: string;
}

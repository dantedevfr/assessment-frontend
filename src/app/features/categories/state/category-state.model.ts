import { Category } from "../models/category.model";

/*export interface CategoryState {
  categories: Record<number, Category>;
  levels: number[][];
  selectedCategories: (number | null)[];
  loading: boolean;
  error: any;
}*/
export interface CategoryState {
  categoryLevels: Category[][];
  selectedCategories: (Category | null)[];
  allCategories: Category[]; 
}

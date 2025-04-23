import { Category } from "../models/category.model";

export interface CategoryState {
  categoryLevels: Category[][];
  selectedCategories: (Category | null)[];
  allCategories: Category[]; // 👈 aquí va la carga completa
}

import { TreeNode } from "primeng/api";
import { Category } from "../../categories/models/category.model";

export function buildCategoryTree(categories: Category[]): TreeNode[] {
  const map = new Map<number, TreeNode>();
  const roots: TreeNode[] = [];

  for (const cat of categories) {
    map.set(cat.id, {
      key: cat.id.toString(),
      label: cat.name,
      data: cat,
      children: []
    });
  }

  for (const cat of categories) {
    const node = map.get(cat.id)!;
    if (cat.id_parent_category) {
      const parent = map.get(cat.id_parent_category);
      parent?.children?.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

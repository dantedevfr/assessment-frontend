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

export function findNodeById(nodes: TreeNode[], id?: number): TreeNode | null {
  if (!id) return null;

  for (const node of nodes) {
    if (node.data?.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }

  return null;
}

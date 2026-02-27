import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { CategoryMapping, CleanCategory } from "../types";

interface CategoryComparisonProps {
  categories: CategoryMapping[];
  cleanCategories: CleanCategory[];
}

export function CategoryComparison({
  categories,
  cleanCategories,
}: CategoryComparisonProps) {
  // Build product count map from clean categories (keyed by NL name)
  const productCountMap: Record<string, number> = {};
  const subcategoryCountMap: Record<string, number> = {};
  for (const cat of cleanCategories) {
    const totalProducts = cat.subcategories.reduce(
      (sum, sub) => sum + sub.products.length,
      0
    );
    productCountMap[cat.name.nl] = totalProducts;
    subcategoryCountMap[cat.name.nl] = cat.subcategories.length;
  }

  // Find all old category names that are mapped
  const mappedOldNames = new Set<string>();
  for (const mapping of categories) {
    for (const oldName of mapping.old) {
      mappedOldNames.add(oldName);
    }
  }

  // Find dropped categories (in clean data but not mapped to any new category)
  const droppedCategories = cleanCategories
    .filter((cat) => !mappedOldNames.has(cat.name.nl))
    .map((cat) => cat.name.nl);

  if (categories.length === 0 && cleanCategories.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-slate-500">
          No category data loaded yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Old Category</TableHead>
                <TableHead>New Category</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="text-right">Subcategories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((mapping) => {
                const isDirectMatch =
                  mapping.old.length === 1 && mapping.old[0] === mapping.new;
                const productCount = mapping.old.reduce(
                  (sum, name) => sum + (productCountMap[name] || 0),
                  0
                );
                const subCount = mapping.subcategories.length;

                return (
                  <TableRow key={mapping.new}>
                    <TableCell>
                      <Badge
                        className={
                          isDirectMatch
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-amber-500 hover:bg-amber-600"
                        }
                      >
                        {isDirectMatch ? "Match" : "Renamed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {mapping.old.join(", ")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {mapping.new}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {productCount}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {subCount}
                    </TableCell>
                  </TableRow>
                );
              })}
              {droppedCategories.map((name) => (
                <TableRow key={name} className="bg-red-50/50">
                  <TableCell>
                    <Badge className="bg-[#C41E3A] hover:bg-[#a3182f]">
                      Dropped
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{name}</TableCell>
                  <TableCell className="text-slate-400 italic">
                    → /producten/
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {productCountMap[name] || 0}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {subcategoryCountMap[name] || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

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
  for (const cat of cleanCategories) {
    productCountMap[cat.name.nl] = cat.products.length;
  }

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
                <TableHead>New Category</TableHead>
                <TableHead>Old Subcategories</TableHead>
                <TableHead className="text-right">Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((mapping) => {
                const productCount = productCountMap[mapping.new] || 0;

                return (
                  <TableRow key={mapping.new}>
                    <TableCell className="font-medium">
                      {mapping.new}
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {mapping.old.length <= 3
                        ? mapping.old.join(", ")
                        : `${mapping.old.slice(0, 3).join(", ")} +${mapping.old.length - 3} more`}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {productCount}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

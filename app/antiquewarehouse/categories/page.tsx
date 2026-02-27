import Link from "next/link";
import { getAllCategories } from "../lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderTree, Package, AlertTriangle } from "lucide-react";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Categories</h2>
        <p className="text-sm text-slate-500 mt-1">
          {categories.length} categories with{" "}
          {categories.reduce((s, c) => s + c.subcategoryCount, 0)} subcategories
          and{" "}
          {categories.reduce((s, c) => s + c.productCount, 0)} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/antiquewarehouse/categories/${cat.slug}`}>
            <Card className="h-full hover:border-[#C41E3A]/30 hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-900 leading-tight">
                  {cat.name.en}
                </CardTitle>
                <p className="text-xs text-slate-400">{cat.name.nl}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <FolderTree className="h-3.5 w-3.5" />
                    {cat.subcategoryCount} subcategories
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    {cat.productCount} products
                  </span>
                </div>
                {cat.emptySubcategoryCount > 0 && (
                  <Badge
                    variant="outline"
                    className="mt-2 text-amber-600 border-amber-200 bg-amber-50 text-xs"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {cat.emptySubcategoryCount} empty subcategories
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

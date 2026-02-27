import { notFound } from "next/navigation";
import { getCategoryBySlug, getAllCategories } from "../../lib/data";
import { Breadcrumb } from "../../_components/breadcrumb";
import { SubcategoriesSection } from "../../_components/empty-subcategories-toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderTree, Package, AlertTriangle } from "lucide-react";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ categorySlug: c.slug }));
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Categories", href: "/antiquewarehouse/categories" },
          { label: category.name.en },
        ]}
      />

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          {category.name.en}
        </h2>
        <p className="text-sm text-slate-400">{category.name.nl}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-slate-500 font-medium">
              Subcategories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-slate-400" />
              <span className="text-2xl font-bold text-slate-900">
                {category.subcategoryCount}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-slate-500 font-medium">
              Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-400" />
              <span className="text-2xl font-bold text-slate-900">
                {category.productCount}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-slate-500 font-medium">
              Empty Subcategories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-2xl font-bold text-slate-900">
                {category.emptySubcategoryCount}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Subcategories
        </h3>
        <SubcategoriesSection
          categorySlug={category.slug}
          subcategories={category.enrichedSubcategories}
          emptyCount={category.emptySubcategoryCount}
        />
      </section>
    </div>
  );
}

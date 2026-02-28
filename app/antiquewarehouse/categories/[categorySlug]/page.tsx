import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getProductsForCategory, getAllCategories } from "../../lib/data";
import { Breadcrumb } from "../../_components/breadcrumb";
import { PriceBadge } from "../../_components/price-badge";
import { DataQualityBadges } from "../../_components/data-quality-badges";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const products = getProductsForCategory(categorySlug);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>

      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Products ({products.length})
        </h3>
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-sm text-slate-400">
              No products in this category.
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article #</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.articleNumber}>
                    <TableCell>
                      <Link
                        href={`/antiquewarehouse/products/${p.articleNumber}`}
                        className="text-sm font-mono text-[#C41E3A] hover:underline"
                      >
                        {p.articleNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{p.name.en}</TableCell>
                    <TableCell>
                      <PriceBadge price={p.price} />
                    </TableCell>
                    <TableCell>
                      <DataQualityBadges product={p} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}

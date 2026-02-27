import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSubcategoryBySlug,
  getProductsForSubcategory,
  getAllCategories,
} from "../../../lib/data";
import { Breadcrumb } from "../../../_components/breadcrumb";
import { PriceBadge } from "../../../_components/price-badge";
import { DataQualityBadges } from "../../../_components/data-quality-badges";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function generateStaticParams() {
  const categories = getAllCategories();
  const params: { categorySlug: string; subcategorySlug: string }[] = [];
  for (const cat of categories) {
    for (const sub of cat.enrichedSubcategories) {
      params.push({ categorySlug: cat.slug, subcategorySlug: sub.slug });
    }
  }
  return params;
}

export default async function SubcategoryDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) {
  const { categorySlug, subcategorySlug } = await params;
  const result = getSubcategoryBySlug(categorySlug, subcategorySlug);
  if (!result) notFound();

  const { category, subcategory } = result;
  const products = getProductsForSubcategory(categorySlug, subcategorySlug);

  const hasDescription =
    subcategory.description.en.trim() ||
    subcategory.description.nl.trim() ||
    subcategory.description.de.trim();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Categories", href: "/antiquewarehouse/categories" },
          {
            label: category.name.en,
            href: `/antiquewarehouse/categories/${category.slug}`,
          },
          { label: subcategory.name.en },
        ]}
      />

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          {subcategory.name.en}
        </h2>
        <p className="text-sm text-slate-400">{subcategory.name.nl}</p>
      </div>

      {hasDescription && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="en">
              <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="nl">Dutch</TabsTrigger>
                <TabsTrigger value="de">German</TabsTrigger>
              </TabsList>
              <TabsContent value="en">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {subcategory.description.en || (
                    <span className="italic text-slate-400">
                      No English description
                    </span>
                  )}
                </p>
              </TabsContent>
              <TabsContent value="nl">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {subcategory.description.nl || (
                    <span className="italic text-slate-400">
                      No Dutch description
                    </span>
                  )}
                </p>
              </TabsContent>
              <TabsContent value="de">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {subcategory.description.de || (
                    <span className="italic text-slate-400">
                      No German description
                    </span>
                  )}
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Products ({products.length})
        </h3>
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-sm text-slate-400">
              No products in this subcategory.
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

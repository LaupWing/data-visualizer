import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByArticleNumber, getAllProducts } from "../../lib/data";
import { Breadcrumb } from "../../_components/breadcrumb";
import { PriceBadge } from "../../_components/price-badge";
import { DataQualityBadges } from "../../_components/data-quality-badges";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ articleNumber: p.articleNumber }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ articleNumber: string }>;
}) {
  const { articleNumber } = await params;
  const product = getProductByArticleNumber(articleNumber);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Products", href: "/antiquewarehouse/products" },
          { label: `#${product.articleNumber}` },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {product.name.en}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Article #{product.articleNumber}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PriceBadge price={product.price} />
          <DataQualityBadges product={product} />
        </div>
      </div>

      {/* Translations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">
            Product Name
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
              <p className="text-sm text-slate-700">{product.name.en}</p>
            </TabsContent>
            <TabsContent value="nl">
              <p className="text-sm text-slate-700">{product.name.nl}</p>
            </TabsContent>
            <TabsContent value="de">
              <p className="text-sm text-slate-700">{product.name.de}</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
                {product.description.en || (
                  <span className="italic text-slate-400">
                    No English description
                  </span>
                )}
              </p>
            </TabsContent>
            <TabsContent value="nl">
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description.nl || (
                  <span className="italic text-slate-400">
                    No Dutch description
                  </span>
                )}
              </p>
            </TabsContent>
            <TabsContent value="de">
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description.de || (
                  <span className="italic text-slate-400">
                    No German description
                  </span>
                )}
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Appears in */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">
            Appears in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={`/antiquewarehouse/categories/${product.categorySlug}`}
              className="text-[#C41E3A] hover:underline"
            >
              {product.categoryName.en}
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href={`/antiquewarehouse/categories/${product.categorySlug}/${product.subcategorySlug}`}
              className="text-[#C41E3A] hover:underline"
            >
              {product.subcategoryName.en}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

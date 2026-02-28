import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Package,
  FolderTree,
  ArrowRightLeft,
  Globe,
} from "lucide-react";
import type {
  UrlMappingEntry,
  CategoryMapping,
  CleanCategory,
} from "../types";

interface StatsCardsProps {
  urls: UrlMappingEntry[];
  categories: CategoryMapping[];
  cleanCategories: CleanCategory[];
}

export function StatsCards({
  urls,
  categories,
  cleanCategories,
}: StatsCardsProps) {
  const productUrls = urls.filter((u) => u.type === "product");
  const uniqueProducts = new Set(
    productUrls.map((u) => u.article_number).filter(Boolean)
  ).size;
  const totalProducts = productUrls.length;

  const totalCleanProducts = cleanCategories.reduce(
    (sum, cat) => sum + cat.products.length,
    0
  );

  const stats = [
    {
      label: "Products",
      value: totalCleanProducts > 0 ? totalCleanProducts.toLocaleString() : "—",
      detail:
        uniqueProducts > 0
          ? `${uniqueProducts.toLocaleString()} unique in URL mapping`
          : "Awaiting data",
      icon: Package,
    },
    {
      label: "Categories",
      value: categories.length > 0 ? categories.length.toString() : "—",
      detail:
        categories.length > 0
          ? `${cleanCategories.length} flat categories`
          : "Awaiting data",
      icon: FolderTree,
    },
    {
      label: "URL Redirects",
      value: urls.length > 0 ? urls.length.toLocaleString() : "—",
      detail: urls.length > 0 ? "total redirects configured" : "Awaiting data",
      icon: ArrowRightLeft,
    },
    {
      label: "Languages",
      value: "3",
      detail: "NL / EN / DE",
      icon: Globe,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className="h-5 w-5 text-[#C41E3A]" />
              <span className="text-sm font-medium text-slate-500">
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stat.value}
            </div>
            <p className="text-xs text-slate-500 mt-1">{stat.detail}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

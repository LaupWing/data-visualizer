import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Package,
  FolderTree,
  GitBranch,
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

  const oldCategoryCount = cleanCategories.length;
  const newCategoryCount = categories.length;
  const droppedCategories = oldCategoryCount - newCategoryCount;

  const oldSubcategoryCount = cleanCategories.reduce(
    (sum, cat) => sum + cat.subcategories.length,
    0
  );
  const newSubcategoryCount = categories.reduce(
    (sum, cat) => sum + cat.subcategories.length,
    0
  );

  const stats = [
    {
      label: "Products",
      value: uniqueProducts > 0 ? uniqueProducts.toLocaleString() : "—",
      detail:
        totalProducts > 0
          ? `${totalProducts.toLocaleString()} total incl. duplicates`
          : "Awaiting data",
      icon: Package,
    },
    {
      label: "Categories",
      value:
        oldCategoryCount > 0
          ? `${oldCategoryCount} → ${newCategoryCount}`
          : "—",
      detail:
        droppedCategories > 0 ? `${droppedCategories} dropped` : "Awaiting data",
      icon: FolderTree,
    },
    {
      label: "Subcategories",
      value:
        oldSubcategoryCount > 0
          ? `${oldSubcategoryCount} → ${newSubcategoryCount}`
          : "—",
      detail:
        oldSubcategoryCount > 0
          ? `${oldSubcategoryCount - newSubcategoryCount} consolidated`
          : "Awaiting data",
      icon: GitBranch,
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
    <div className="grid grid-cols-5 gap-4">
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

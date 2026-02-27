import urlMappingData from "@/src/data/antiquewarehouse/url-mapping.json";
import categoryMappingData from "@/src/data/antiquewarehouse/category-mapping.json";
import categoriesCleanData from "@/src/data/antiquewarehouse/categories-clean.json";
import { StatsCards } from "./_components/stats-cards";
import { CategoryComparison } from "./_components/category-comparison";
import { UrlMappingTable } from "./_components/url-mapping-table";
import { UrlStructureExplainer } from "./_components/url-structure-explainer";
import { TranslationPreview } from "./_components/translation-preview";
import { PdfDownloadButton } from "./_components/pdf-download-button";
import { Separator } from "@/components/ui/separator";
import type { UrlMappingEntry, CategoryMapping, CleanCategory } from "./types";

export default function AntiqueWarehousePage() {
  const urls = urlMappingData as UrlMappingEntry[];
  const categories = categoryMappingData as CategoryMapping[];
  const cleanCategories = categoriesCleanData as CleanCategory[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Migration Dashboard
        </h2>
        <div className="flex items-center gap-3">
          <PdfDownloadButton
            urls={urls}
            categories={categories}
            cleanCategories={cleanCategories}
          />
          <span className="text-xs px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 font-medium">
            In Progress
          </span>
        </div>
      </div>

      <StatsCards
        urls={urls}
        categories={categories}
        cleanCategories={cleanCategories}
      />

      <Separator />

      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Category Restructuring
        </h2>
        <CategoryComparison
          categories={categories}
          cleanCategories={cleanCategories}
        />
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          URL Structure Changes
        </h2>
        <UrlStructureExplainer />
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          URL Redirect Mapping
        </h2>
        <UrlMappingTable urls={urls} />
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Multilingual Content
        </h2>
        <TranslationPreview cleanCategories={cleanCategories} />
      </section>
    </div>
  );
}

import urlMappingData from "@/src/data/antiquewarehouse/url-mapping.json";
import categoryMappingData from "@/src/data/antiquewarehouse/category-mapping.json";
import categoriesCleanData from "@/src/data/antiquewarehouse/categories-clean.json";
import { StatsCards } from "./_components/stats-cards";
import { CategoryComparison } from "./_components/category-comparison";
import { UrlMappingTable } from "./_components/url-mapping-table";
import { UrlStructureExplainer } from "./_components/url-structure-explainer";
import { TranslationPreview } from "./_components/translation-preview";
import { Separator } from "@/components/ui/separator";
import type { UrlMappingEntry, CategoryMapping, CleanCategory } from "./types";

export default function AntiqueWarehousePage() {
  const urls = urlMappingData as UrlMappingEntry[];
  const categories = categoryMappingData as CategoryMapping[];
  const cleanCategories = categoriesCleanData as CleanCategory[];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Antique Warehouse
                <span className="text-[#C41E3A] ml-2">
                  Migration Dashboard
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                antiquewarehouse.nl — Custom PHP → WordPress
              </p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 font-medium">
              In Progress
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
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
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <p className="text-xs text-slate-400 text-center">
            Migration dashboard for antiquewarehouse.nl — Data-driven overview
            of PHP → WordPress transition
          </p>
        </div>
      </footer>
    </div>
  );
}

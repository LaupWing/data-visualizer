import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const patterns = [
  {
    label: "Products",
    old: "/producten/show/2755",
    newUrl: "/product/antieke-globe-wernicke/",
    description: "Numeric IDs replaced with SEO-friendly slugs",
    removed: false,
  },
  {
    label: "Categories",
    old: "/{categorie}/{subcategorie}",
    newUrl: "/producten/{categorie}/",
    description: "Flat categories under /producten/ — no more subcategory level",
    removed: false,
  },
  {
    label: "Pagination",
    old: "/{categorie}/{sub}/pagina/2",
    newUrl: "Removed",
    description: "Server-side pagination replaced with client-side JavaScript",
    removed: true,
  },
];

export function UrlStructureExplainer() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-3">
        {patterns.map((pattern) => (
          <div
            key={pattern.label}
            className="flex items-center gap-4 p-4 rounded-lg bg-slate-50"
          >
            <div className="shrink-0 w-28">
              <span className="text-sm font-semibold text-[#C41E3A]">
                {pattern.label}
              </span>
            </div>
            <code className="text-sm bg-white px-3 py-2 rounded border border-slate-200 text-slate-600 flex-1 truncate">
              {pattern.old}
            </code>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
            <code
              className={`text-sm px-3 py-2 rounded border flex-1 truncate ${
                pattern.removed
                  ? "bg-red-50 text-[#C41E3A] border-red-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {pattern.newUrl}
            </code>
            <span className="text-xs text-slate-500 shrink-0 max-w-[240px]">
              {pattern.description}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

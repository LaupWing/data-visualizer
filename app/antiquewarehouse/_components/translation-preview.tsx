"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CleanCategory, Product } from "../types";

interface TranslationPreviewProps {
  cleanCategories: CleanCategory[];
}

export function TranslationPreview({
  cleanCategories,
}: TranslationPreviewProps) {
  // Collect first 8 products across all categories
  const sampleProducts: {
    product: Product;
    category: string;
  }[] = [];

  outer: for (const cat of cleanCategories) {
    for (const prod of cat.products) {
      if (sampleProducts.length >= 8) break outer;
      sampleProducts.push({
        product: prod,
        category: cat.name.nl,
      });
    }
  }

  if (sampleProducts.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-slate-500">
          No product data loaded yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="nl">
          <TabsList>
            <TabsTrigger value="nl">Nederlands</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="de">Deutsch</TabsTrigger>
          </TabsList>
          {(["nl", "en", "de"] as const).map((lang) => (
            <TabsContent key={lang} value={lang}>
              <div className="space-y-3">
                {sampleProducts.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-slate-200 bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900">
                          {item.product.name[lang] || (
                            <span className="text-slate-400 italic">
                              No translation
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {item.product.description[lang] || (
                            <span className="text-slate-400 italic">
                              No translation
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-bold text-[#C41E3A]">
                          {item.product.price}
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          #{item.product.articleNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

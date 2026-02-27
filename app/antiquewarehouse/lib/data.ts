import categoriesCleanData from "@/src/data/antiquewarehouse/categories-clean.json";
import type { CleanCategory, CleanSubcategory, Product, MultiLang } from "../types";

const rawCategories = categoriesCleanData as CleanCategory[];

// --- Slug helpers ---

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- Enriched types ---

export interface EnrichedProduct extends Product {
  categorySlug: string;
  categoryName: MultiLang;
  subcategorySlug: string;
  subcategoryName: MultiLang;
}

export interface EnrichedSubcategory extends CleanSubcategory {
  slug: string;
  productCount: number;
  categorySlug: string;
  categoryName: MultiLang;
}

export interface EnrichedCategory extends CleanCategory {
  slug: string;
  productCount: number;
  subcategoryCount: number;
  emptySubcategoryCount: number;
  enrichedSubcategories: EnrichedSubcategory[];
}

// --- Build enriched data ---

function buildEnrichedData() {
  const categories: EnrichedCategory[] = [];
  const allProducts: EnrichedProduct[] = [];
  const seenArticles = new Set<string>();

  for (const cat of rawCategories) {
    const catSlug = toSlug(cat.name.en);
    const enrichedSubs: EnrichedSubcategory[] = [];
    let catProductCount = 0;
    let emptySubCount = 0;

    for (const sub of cat.subcategories) {
      const subSlug = toSlug(sub.name.en);
      enrichedSubs.push({
        ...sub,
        slug: subSlug,
        productCount: sub.products.length,
        categorySlug: catSlug,
        categoryName: cat.name,
      });

      catProductCount += sub.products.length;
      if (sub.products.length === 0) emptySubCount++;

      for (const product of sub.products) {
        if (!seenArticles.has(product.articleNumber)) {
          seenArticles.add(product.articleNumber);
          allProducts.push({
            ...product,
            categorySlug: catSlug,
            categoryName: cat.name,
            subcategorySlug: subSlug,
            subcategoryName: sub.name,
          });
        }
      }
    }

    categories.push({
      ...cat,
      slug: catSlug,
      productCount: catProductCount,
      subcategoryCount: cat.subcategories.length,
      emptySubcategoryCount: emptySubCount,
      enrichedSubcategories: enrichedSubs,
    });
  }

  return { categories, allProducts };
}

const enriched = buildEnrichedData();

// --- Query functions ---

export function getAllCategories(): EnrichedCategory[] {
  return enriched.categories;
}

export function getCategoryBySlug(slug: string): EnrichedCategory | undefined {
  return enriched.categories.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): { category: EnrichedCategory; subcategory: EnrichedSubcategory } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const subcategory = category.enrichedSubcategories.find(
    (s) => s.slug === subcategorySlug
  );
  if (!subcategory) return undefined;
  return { category, subcategory };
}

export function getAllProducts(): EnrichedProduct[] {
  return enriched.allProducts;
}

export function getProductByArticleNumber(
  articleNumber: string
): EnrichedProduct | undefined {
  return enriched.allProducts.find((p) => p.articleNumber === articleNumber);
}

export function getProductsForSubcategory(
  categorySlug: string,
  subcategorySlug: string
): EnrichedProduct[] {
  return enriched.allProducts.filter(
    (p) => p.categorySlug === categorySlug && p.subcategorySlug === subcategorySlug
  );
}

// --- Data quality stats ---

export function getDataQualityStats() {
  const products = enriched.allProducts;
  const missingPrice = products.filter(
    (p) => p.price === "€" || p.price.trim() === "" || p.price === "€0"
  ).length;
  const callForPrice = products.filter(
    (p) => p.price.toLowerCase().includes("bel ons")
  ).length;
  const missingDescription = products.filter(
    (p) => !p.description.nl && !p.description.en && !p.description.de
  ).length;

  return { missingPrice, callForPrice, missingDescription };
}

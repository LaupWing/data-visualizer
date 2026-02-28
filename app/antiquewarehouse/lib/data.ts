import categoriesCleanData from "@/src/data/antiquewarehouse/categories-clean.json";
import type { CleanCategory, Product, MultiLang } from "../types";

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
}

export interface EnrichedCategory extends CleanCategory {
  slug: string;
  productCount: number;
}

// --- Build enriched data ---

function buildEnrichedData() {
  const categories: EnrichedCategory[] = [];
  const allProducts: EnrichedProduct[] = [];
  const seenArticles = new Set<string>();

  for (const cat of rawCategories) {
    const catSlug = toSlug(cat.name.en);

    for (const product of cat.products) {
      if (!seenArticles.has(product.articleNumber)) {
        seenArticles.add(product.articleNumber);
        allProducts.push({
          ...product,
          categorySlug: catSlug,
          categoryName: cat.name,
        });
      }
    }

    categories.push({
      ...cat,
      slug: catSlug,
      productCount: cat.products.length,
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

export function getAllProducts(): EnrichedProduct[] {
  return enriched.allProducts;
}

export function getProductByArticleNumber(
  articleNumber: string
): EnrichedProduct | undefined {
  return enriched.allProducts.find((p) => p.articleNumber === articleNumber);
}

export function getProductsForCategory(
  categorySlug: string
): EnrichedProduct[] {
  return enriched.allProducts.filter((p) => p.categorySlug === categorySlug);
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

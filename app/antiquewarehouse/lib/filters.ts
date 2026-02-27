import type { EnrichedProduct } from "./data";

export function isMissingPrice(product: EnrichedProduct): boolean {
  const p = product.price.trim();
  return p === "€" || p === "" || p === "€0";
}

export function isCallForPrice(product: EnrichedProduct): boolean {
  return product.price.toLowerCase().includes("bel ons");
}

export function isMissingDescription(product: EnrichedProduct): boolean {
  return (
    !product.description.nl.trim() &&
    !product.description.en.trim() &&
    !product.description.de.trim()
  );
}

export function hasPrice(product: EnrichedProduct): boolean {
  return !isMissingPrice(product) && !isCallForPrice(product);
}

export interface ProductFilters {
  search: string;
  categorySlug: string;
  showMissingPrice: boolean;
  showCallForPrice: boolean;
  showMissingDescription: boolean;
}

export function filterProducts(
  products: EnrichedProduct[],
  filters: ProductFilters
): EnrichedProduct[] {
  let result = products;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.en.toLowerCase().includes(q) ||
        p.name.nl.toLowerCase().includes(q) ||
        p.name.de.toLowerCase().includes(q) ||
        p.articleNumber.toLowerCase().includes(q)
    );
  }

  if (filters.categorySlug) {
    result = result.filter((p) => p.categorySlug === filters.categorySlug);
  }

  if (filters.showMissingPrice) {
    result = result.filter(isMissingPrice);
  }

  if (filters.showCallForPrice) {
    result = result.filter(isCallForPrice);
  }

  if (filters.showMissingDescription) {
    result = result.filter(isMissingDescription);
  }

  return result;
}

import type { Product } from "../types";

interface DataQualityBadgesProps {
  product: Product;
}

export function DataQualityBadges({ product }: DataQualityBadgesProps) {
  const badges: { label: string; color: string }[] = [];

  const trimmedPrice = product.price.trim();
  if (trimmedPrice === "€" || trimmedPrice === "" || trimmedPrice === "€0") {
    badges.push({ label: "No price", color: "bg-red-100 text-red-700" });
  } else if (trimmedPrice.toLowerCase().includes("bel ons")) {
    badges.push({
      label: "Call for price",
      color: "bg-amber-100 text-amber-700",
    });
  }

  const hasDesc =
    product.description.nl.trim() ||
    product.description.en.trim() ||
    product.description.de.trim();
  if (!hasDesc) {
    badges.push({
      label: "No description",
      color: "bg-slate-100 text-slate-600",
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <span
          key={b.label}
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${b.color}`}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}

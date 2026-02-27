import { cn } from "@/lib/utils";

interface PriceBadgeProps {
  price: string;
}

export function PriceBadge({ price }: PriceBadgeProps) {
  const trimmed = price.trim();
  const isCallForPrice = trimmed.toLowerCase().includes("bel ons");
  const isMissing = trimmed === "€" || trimmed === "" || trimmed === "€0";

  if (isMissing) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
        No price
      </span>
    );
  }

  if (isCallForPrice) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
        Call for price
      </span>
    );
  }

  return (
    <span className={cn("text-sm font-semibold text-[#C41E3A]")}>
      {trimmed}
    </span>
  );
}

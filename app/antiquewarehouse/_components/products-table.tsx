"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { EnrichedProduct, EnrichedCategory } from "../lib/data";
import {
  filterProducts,
  isMissingPrice,
  isCallForPrice,
  isMissingDescription,
  type ProductFilters,
} from "../lib/filters";
import { PriceBadge } from "./price-badge";
import { DataQualityBadges } from "./data-quality-badges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "nl" | "de";

const PAGE_SIZE = 50;

interface ProductsTableProps {
  products: EnrichedProduct[];
  categories: EnrichedCategory[];
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    categorySlug: "",
    showMissingPrice: false,
    showCallForPrice: false,
    showMissingDescription: false,
  });
  const [lang, setLang] = useState<Lang>("en");
  const [page, setPage] = useState(0);

  const qualityCounts = useMemo(() => {
    return {
      missingPrice: products.filter(isMissingPrice).length,
      callForPrice: products.filter(isCallForPrice).length,
      missingDescription: products.filter(isMissingDescription).length,
    };
  }, [products]);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageProducts = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function updateFilter<K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  return (
    <div className="space-y-4">
      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search name or article #..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={filters.categorySlug || "all"}
          onValueChange={(v) =>
            updateFilter("categorySlug", v === "all" ? "" : v)
          }
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name.en} ({c.productCount})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language + quality toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-0.5">
          {(["en", "nl", "de"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                lang === l
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ToggleButton
            active={filters.showMissingPrice}
            onClick={() =>
              updateFilter("showMissingPrice", !filters.showMissingPrice)
            }
            color="red"
          >
            Missing price ({qualityCounts.missingPrice})
          </ToggleButton>
          <ToggleButton
            active={filters.showCallForPrice}
            onClick={() =>
              updateFilter("showCallForPrice", !filters.showCallForPrice)
            }
            color="amber"
          >
            Call for price ({qualityCounts.callForPrice})
          </ToggleButton>
          <ToggleButton
            active={filters.showMissingDescription}
            onClick={() =>
              updateFilter(
                "showMissingDescription",
                !filters.showMissingDescription
              )
            }
            color="slate"
          >
            Missing description ({qualityCounts.missingDescription})
          </ToggleButton>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500">
        Showing {page * PAGE_SIZE + 1}–
        {Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
        {filtered.length} products
      </p>

      {/* Table */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[90px]">Article #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageProducts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-sm text-slate-400"
                >
                  No products match your filters.
                </TableCell>
              </TableRow>
            ) : (
              pageProducts.map((p) => (
                <TableRow key={p.articleNumber}>
                  <TableCell>
                    <Link
                      href={`/antiquewarehouse/products/${p.articleNumber}`}
                      className="text-sm font-mono text-[#C41E3A] hover:underline"
                    >
                      {p.articleNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm max-w-[300px] truncate">
                    {p.name[lang]}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    <Link
                      href={`/antiquewarehouse/categories/${p.categorySlug}`}
                      className="hover:text-[#C41E3A] transition-colors"
                    >
                      {p.categoryName[lang]}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <PriceBadge price={p.price} />
                  </TableCell>
                  <TableCell>
                    <DataQualityBadges product={p} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-xs text-slate-500">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  color,
  children,
}: {
  active: boolean;
  onClick: () => void;
  color: "red" | "amber" | "slate";
  children: React.ReactNode;
}) {
  const colorMap = {
    red: {
      active: "bg-red-100 text-red-700 border-red-200",
      inactive: "text-slate-500 border-slate-200 hover:border-red-200 hover:text-red-600",
    },
    amber: {
      active: "bg-amber-100 text-amber-700 border-amber-200",
      inactive: "text-slate-500 border-slate-200 hover:border-amber-200 hover:text-amber-600",
    },
    slate: {
      active: "bg-slate-200 text-slate-700 border-slate-300",
      inactive: "text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-600",
    },
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
        active ? colorMap[color].active : colorMap[color].inactive
      )}
    >
      {children}
    </button>
  );
}

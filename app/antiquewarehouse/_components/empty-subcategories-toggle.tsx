"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EnrichedSubcategory } from "../lib/data";

interface SubcategoriesSectionProps {
  categorySlug: string;
  subcategories: EnrichedSubcategory[];
  emptyCount: number;
}

export function SubcategoriesSection({
  categorySlug,
  subcategories,
  emptyCount,
}: SubcategoriesSectionProps) {
  const [showEmpty, setShowEmpty] = useState(false);

  const visible = subcategories.filter(
    (s) => showEmpty || s.productCount > 0
  );

  return (
    <div>
      {emptyCount > 0 && (
        <div className="flex items-center justify-end mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEmpty(!showEmpty)}
            className="text-xs"
          >
            {showEmpty ? (
              <EyeOff className="h-3.5 w-3.5 mr-1.5" />
            ) : (
              <Eye className="h-3.5 w-3.5 mr-1.5" />
            )}
            {showEmpty ? "Hide" : "Show"} empty subcategories ({emptyCount})
          </Button>
        </div>
      )}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (EN)</TableHead>
              <TableHead>Name (NL)</TableHead>
              <TableHead className="text-right">Products</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((sub) => (
              <TableRow key={sub.slug}>
                <TableCell>
                  {sub.productCount > 0 ? (
                    <Link
                      href={`/antiquewarehouse/categories/${categorySlug}/${sub.slug}`}
                      className="text-sm font-medium text-[#C41E3A] hover:underline"
                    >
                      {sub.name.en}
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-400">
                      {sub.name.en}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {sub.name.nl}
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {sub.productCount}
                </TableCell>
                <TableCell>
                  {sub.productCount === 0 ? (
                    <Badge
                      variant="outline"
                      className="text-amber-600 border-amber-200 bg-amber-50 text-xs"
                    >
                      Empty
                    </Badge>
                  ) : !sub.description.en.trim() ? (
                    <Badge
                      variant="outline"
                      className="text-slate-500 border-slate-200 bg-slate-50 text-xs"
                    >
                      No description
                    </Badge>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

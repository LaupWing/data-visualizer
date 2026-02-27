"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UrlMappingEntry } from "../types";

interface UrlMappingTableProps {
  urls: UrlMappingEntry[];
}

const TYPE_STYLES: Record<string, string> = {
  product: "bg-emerald-500 hover:bg-emerald-600",
  subcategory: "bg-emerald-600 hover:bg-emerald-700",
  pagination: "bg-amber-500 hover:bg-amber-600",
  dropped: "bg-[#C41E3A] hover:bg-[#a3182f]",
};

const PAGE_SIZE = 50;

export function UrlMappingTable({ urls }: UrlMappingTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(0);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const u of urls) {
      counts[u.type] = (counts[u.type] || 0) + 1;
    }
    return counts;
  }, [urls]);

  const filtered = useMemo(() => {
    return urls.filter((u) => {
      if (typeFilter !== "all" && u.type !== typeFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          u.old_url.toLowerCase().includes(s) ||
          u.new_url.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [urls, search, typeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(0);
  };
  const handleFilter = (val: string) => {
    setTypeFilter(val);
    setPage(0);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Search URLs..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={typeFilter} onValueChange={handleFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types ({urls.length})</SelectItem>
              <SelectItem value="product">
                Product ({typeCounts.product || 0})
              </SelectItem>
              <SelectItem value="subcategory">
                Subcategory ({typeCounts.subcategory || 0})
              </SelectItem>
              <SelectItem value="pagination">
                Pagination ({typeCounts.pagination || 0})
              </SelectItem>
              <SelectItem value="dropped">
                Dropped ({typeCounts.dropped || 0})
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-slate-500 ml-auto">
            {filtered.length.toLocaleString()} results
          </span>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[110px]">Type</TableHead>
                <TableHead>Old URL</TableHead>
                <TableHead>New URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-slate-500 py-8"
                  >
                    {urls.length === 0
                      ? "No URL data loaded yet"
                      : "No matching URLs found"}
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((url, i) => (
                  <TableRow key={`${url.old_url}-${i}`}>
                    <TableCell>
                      <Badge
                        className={TYPE_STYLES[url.type] || "bg-slate-500"}
                      >
                        {url.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-slate-600 max-w-[400px] truncate">
                      {url.old_url}
                    </TableCell>
                    <TableCell className="font-mono text-sm max-w-[400px] truncate">
                      {url.new_url}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-slate-500">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={page >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

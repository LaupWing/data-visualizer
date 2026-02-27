"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import type {
  UrlMappingEntry,
  CategoryMapping,
  CleanCategory,
} from "../types";

interface PdfDownloadButtonProps {
  urls: UrlMappingEntry[];
  categories: CategoryMapping[];
  cleanCategories: CleanCategory[];
}

export function PdfDownloadButton({
  urls,
  categories,
  cleanCategories,
}: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { MigrationReportPDF } = await import("./pdf-document");

      const blob = await pdf(
        <MigrationReportPDF
          urls={urls}
          categories={categories}
          cleanCategories={cleanCategories}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "antiquewarehouse-migration-report.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="bg-[#C41E3A] hover:bg-[#a3182f] text-white"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      {loading ? "Generating PDF..." : "Download PDF Report"}
    </Button>
  );
}

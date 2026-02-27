"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Dashboard", href: "/antiquewarehouse" },
  { label: "Categories", href: "/antiquewarehouse/categories" },
  { label: "Products", href: "/antiquewarehouse/products" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/antiquewarehouse"
                ? pathname === "/antiquewarehouse"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "py-3 text-sm font-medium border-b-2 transition-colors",
                  isActive
                    ? "border-[#C41E3A] text-[#C41E3A]"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

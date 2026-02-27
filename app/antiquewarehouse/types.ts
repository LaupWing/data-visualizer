export interface UrlMappingEntry {
  old_url: string;
  new_url: string;
  type: "subcategory" | "product" | "pagination" | "dropped";
  article_number?: string;
  status?: string;
}

export interface SubcategoryMapping {
  new: string;
  old: string[];
}

export interface CategoryMapping {
  new: string;
  old: string[];
  subcategories: SubcategoryMapping[];
}

export interface MultiLang {
  nl: string;
  en: string;
  de: string;
}

export interface Product {
  articleNumber: string;
  price: string;
  name: MultiLang;
  description: MultiLang;
}

export interface CleanSubcategory {
  name: MultiLang;
  description: MultiLang;
  products: Product[];
}

export interface CleanCategory {
  name: MultiLang;
  subcategories: CleanSubcategory[];
}

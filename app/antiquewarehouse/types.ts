export interface UrlMappingEntry {
  old_url: string;
  new_url: string;
  type: "category" | "product" | "pagination" | "dropped";
  article_number?: string;
  status?: string;
}

export interface CategoryMapping {
  new: string;
  old: string[];
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

export interface CleanCategory {
  name: MultiLang;
  products: Product[];
}

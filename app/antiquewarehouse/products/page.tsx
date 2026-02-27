import { getAllProducts, getAllCategories } from "../lib/data";
import { ProductsTable } from "../_components/products-table";

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Products</h2>
        <p className="text-sm text-slate-500 mt-1">
          {products.length} unique products (deduplicated by article number)
        </p>
      </div>
      <ProductsTable products={products} categories={categories} />
    </div>
  );
}

import ProductController from "@/actions/App/Http/Controllers/ProductController";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/common.type";
import productRoutes from "@/routes/products";
import { IProductResponse } from "@/types/product.type";
import { IResponseMeta } from "@/types/response.type";
import { IRouteCollection } from "@/types/route.type";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import PaginationSection from "../custom-components/pagination";
import { useCategoryContext } from "./category-provider";
import ProductTable from "./product-table";

const ProductSection = () => {
  const { search } = ProductController;
  const { selectedChildId, selectedParentId } = useCategoryContext();
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [meta, setMeta] = useState<IResponseMeta>();

  const handleSearchProductByCategtory = useCallback(async () => {
    try {
      const res = await fetch(
        search.url({
          query: {
            mainCategory: selectedParentId,
            subCategory: selectedChildId,
            page: DEFAULT_PAGE,
            take: DEFAULT_LIMIT,
          },
        }),
      );
      if (!res.ok) {
        toast.error("Error", {
          description: "Failed to load product detail",
          position: "top-right",
          richColors: true,
        });
        throw new Error("Failed to load product detail");
      }
      const result = await res.json();
      if (result.status === 200) {
        const { data, meta } = result.data;
        setProducts(data);
        setMeta(meta);
      }
    } catch (err) {
      console.error(err);
    }
  }, [selectedParentId, selectedChildId]);

  useEffect(() => {
    if (selectedParentId || selectedChildId) {
      handleSearchProductByCategtory();
    }
  }, [selectedChildId, selectedParentId]);

  return (
    <div className="flex max-h-[600px] flex-1 flex-col overflow-hidden">
      <p className="text-xl font-semibold">Products ({meta?.total})</p>
      {products.length > 0 ? (
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ProductTable data={products} />
          </div>
          <PaginationSection
            meta={meta}
            routes={productRoutes as unknown as IRouteCollection}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">No product found</p>
      )}
    </div>
  );
};

export default ProductSection;

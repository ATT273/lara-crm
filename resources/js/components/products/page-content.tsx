import products from "@/routes/products";
import { IProductResponse } from "@/types/product.type";
import { IResponseMeta } from "@/types/response.type";
import type { IRouteCollection } from "@/types/route.type";
import PaginationSection from "../custom-components/pagination";
import ProductTable from "./product-table";

interface PageContentProps {
  data: IProductResponse[];
  meta: IResponseMeta;
}

const PageContent = ({ data, meta }: PageContentProps) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <ProductTable products={data} />
      <PaginationSection
        meta={meta}
        routes={products as unknown as IRouteCollection}
      />
    </div>
  );
};

export default PageContent;

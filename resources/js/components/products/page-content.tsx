import { IProductResponse } from "@/types/product.type";
import { IResponseMeta } from "@/types/response.type";
import PaginationSection from "./pagination";
import ProductTable from "./product-table";
interface PageContentProps {
  data: IProductResponse[];
  meta: IResponseMeta;
}

const PageContent = ({ data, meta }: PageContentProps) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <ProductTable products={data} />
      <PaginationSection meta={meta} />
    </div>
  );
};

export default PageContent;

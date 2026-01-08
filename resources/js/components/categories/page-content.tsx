import { IResponseMeta } from "@/types/response.type";
// import ProductTable from "../products/product-table";
import { ICategoryResponse } from "@/types/category.type";
import CategoryProvider from "./category-provider";
import CategorySection from "./category-section";

interface PageContentProps {
  data: ICategoryResponse[];
  meta: IResponseMeta;
}

const PageContent = ({ data }: PageContentProps) => {
  return (
    <CategoryProvider categoriesResponse={data}>
      <div className="flex h-full flex-col gap-4">
        <CategorySection />
        {/* <ProductTable products={data} /> */}
      </div>
    </CategoryProvider>
  );
};

export default PageContent;

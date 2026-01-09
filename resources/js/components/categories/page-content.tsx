import { ICategoryResponse } from "@/types/category.type";
import { IResponseMeta } from "@/types/response.type";
import CategoryProvider from "./category-provider";
import CategorySection from "./category-section";
import ProductSection from "./product-section";

interface PageContentProps {
  data: ICategoryResponse[];
  meta: IResponseMeta;
}

const PageContent = ({ data }: PageContentProps) => {
  return (
    <CategoryProvider categoriesResponse={data}>
      <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
        {/* category section */}
        <CategorySection />
        {/* product section */}
        <ProductSection />
      </div>
    </CategoryProvider>
  );
};

export default PageContent;

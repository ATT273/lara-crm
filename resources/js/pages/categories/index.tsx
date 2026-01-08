import PageContent from "@/components/categories/page-content";
import AppLayout from "@/layouts/app-layout";
import categories from "@/routes/categories";
import { type BreadcrumbItem } from "@/types";
import { ICategoryResponse } from "@/types/category.type";
import { IListResponseData, IPageProps } from "@/types/response.type";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
const CategoryPage = () => {
  const { props } = usePage<IPageProps<ICategoryResponse>>();
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Categories",
      href: categories.index().url,
    },
  ];
  const categoryData = props["data"] as IListResponseData<ICategoryResponse>;

  useEffect(() => {
    if (props.flash?.message) {
      toast.success("Success", {
        description: props.flash.message.message,
        position: "top-right",
        richColors: true,
      });
    }
  }, [props.flash]);
  console.log("categoryData", categoryData);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      <div className="px-4 py-2">
        <PageContent data={categoryData.data} meta={categoryData.meta} />
      </div>
    </AppLayout>
  );
};

export default CategoryPage;

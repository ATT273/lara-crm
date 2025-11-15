"use client";

import NewProductDrawer from "@/components/products/new-product-drawer";
import PageContent from "@/components/products/page-content";
import AppLayout from "@/layouts/app-layout";
import products from "@/routes/products";
import { type BreadcrumbItem } from "@/types";
import { IProductResponse } from "@/types/product.type";
import { IListResponseData, IPageProps } from "@/types/response.type";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const { props } = usePage<IPageProps<IProductResponse>>();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Products",
      href: products.index().url,
    },
  ];

  const productsData = useMemo(() => {
    const { data, meta } = props["data"] as IListResponseData<IProductResponse>;

    return {
      data: data,
      meta: meta,
    };
  }, [props]);

  useEffect(() => {
    if (props.flash?.message) {
      toast.success("Success", {
        description: props.flash.message.message,
        position: "top-right",
        richColors: true,
      });
    }
  }, [props.flash]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="flex items-center justify-end">
        <NewProductDrawer />
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <PageContent data={productsData.data} meta={productsData.meta} />
      </div>
    </AppLayout>
  );
};

export default ProductPage;

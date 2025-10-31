import NewProductDrawer from "@/components/products/new-product-drawer";
import ProductTable from "@/components/products/product-table";
import AppLayout from "@/layouts/app-layout";
import products from "@/routes/products";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const ProductPage = () => {
  const { props } = usePage();
  console.log("props", props);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Products",
      href: products.index().url,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="flex items-center justify-end">
        <NewProductDrawer />
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <ProductTable />
      </div>
    </AppLayout>
  );
};

export default ProductPage;

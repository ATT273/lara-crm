import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import categoryRoutes from "@/routes/categories/index";
import { ICategoryResponse } from "@/types/category.type";
import { IProductResponse } from "@/types/product.type";
import { useEffect, useState } from "react";
import CategoryProvider from "../categories/category-provider";
import ProductForm from "./product-form";

interface NewProductDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialData?: IProductResponse;
}

const NewProductDrawer = ({
  open: controlledOpen,
  onOpenChange,
  initialData,
}: NewProductDrawerProps) => {
  const { all } = categoryRoutes;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled =
    controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? onOpenChange! : setUncontrolledOpen;
  const [categoriesData, setCategoriesData] = useState<ICategoryResponse[]>([]);

  const getAllCategories = async () => {
    try {
      const res = await fetch(all.url());
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const result = await res.json();
      if (result.status === 200) {
        setCategoriesData(result.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // fetch all categories to populate the category select options
    getAllCategories();
  }, []);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DrawerTrigger asChild>
          <Button variant="default">Add Product</Button>
        </DrawerTrigger>
      )}
      <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Create new product</DrawerTitle>
        </DrawerHeader>
        <CategoryProvider categoriesResponse={categoriesData}>
          <ProductForm initialData={initialData} setOpen={setOpen} />
        </CategoryProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default NewProductDrawer;

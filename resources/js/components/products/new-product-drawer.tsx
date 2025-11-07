import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IProductResponse } from "@/types/product.type";
import { useState } from "react";
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
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled =
    controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? onOpenChange! : setUncontrolledOpen;
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DrawerTrigger asChild>
          <Button variant="default">Add Product</Button>
        </DrawerTrigger>
      )}
      <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <ProductForm initialData={initialData} setOpen={setOpen} />
      </DrawerContent>
    </Drawer>
  );
};

export default NewProductDrawer;

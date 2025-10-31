import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProductForm from "./product-form";

const NewProductDrawer = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="default">Add Product</Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <ProductForm />
      </DrawerContent>
    </Drawer>
  );
};

export default NewProductDrawer;

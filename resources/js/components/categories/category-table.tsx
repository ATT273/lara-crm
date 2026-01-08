import CategoryController from "@/actions/App/Http/Controllers/CategoryController";
import { IProductResponse } from "@/types/product.type";
// import { Link } from "@inertiajs/react";
import { useState } from "react";
// import NewProductDrawer from "./new-product-drawer";

interface ProductTableProps {
  categories: IProductResponse[];
}
const CategoryTable = ({ categories }: ProductTableProps) => {
  const { show } = CategoryController;
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    IProductResponse | undefined
  >();

  return (
    <div className="flex-1">
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Sizes</TableHead>
            <TableHead>Sku</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="w-[200px] overflow-hidden text-ellipsis">
                {product.name}
              </TableCell>
              <TableCell className="w-[200px]">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell className="w-[100px]">{product.unit}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                {product.sizes?.map((size) => (
                  <Badge key={size} className="mr-2 mb-2 min-w-[30px]">
                    {size}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                {product.tags?.map((tag) => (
                  <Badge key={tag} className="mr-2 mb-2 min-w-[30px]">
                    {tag}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="grid place-items-center"
                >
                  <Shapes className="size-4" />
                </Button>
              </TableCell>
              <TableCell className="w-[100px]">
                <div className="flex w-[100px] gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="grid place-items-center"
                    onClick={() => handleGetProductDetail(product.id)}
                  >
                    <PenLine className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="grid place-items-center"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      {/* <NewProductDrawer
        open={openEditDrawer}
        onOpenChange={setOpenEditDrawer}
        initialData={selectedProduct}
      /> */}
    </div>
  );
};

export default CategoryTable;

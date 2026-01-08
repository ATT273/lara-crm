import ProductController from "@/actions/App/Http/Controllers/ProductController";
import { formatCurrency } from "@/lib/utils";
import { ICategoryResponse } from "@/types/category.type";
import { IProductResponse } from "@/types/product.type";
import { PenBox, Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCategoryContext } from "./category-provider";
import NewCategoryDialog, { NewCategoryDialogRef } from "./new-category-dialog";

const CategorySection = () => {
  const NewCategoryDialogRef = useRef<NewCategoryDialogRef>(null);
  const { search } = ProductController;
  const { parentCategories, childCategories } = useCategoryContext();
  const [selectedParent, setSelectedParent] =
    useState<ICategoryResponse | null>(null);
  const [selectedChild, setSelectedChild] = useState<ICategoryResponse | null>(
    null,
  );

  const [products, setProducts] = useState<IProductResponse[]>([]);
  const filteredChildCategories = useMemo(() => {
    if (!selectedParent) return [];
    return childCategories.filter(
      (category) => category.parentId === selectedParent.id,
    );
  }, [childCategories, selectedParent]);

  const openNewCategoryDialog = () => {
    NewCategoryDialogRef.current?.open();
  };

  const handleProductByCategtory = async () => {
    try {
      const res = await fetch(
        search.url({
          query: {
            mainCategory: selectedParent?.id,
            subCategory: selectedChild?.id,
          },
        }),
      );
      console.log("res", res);
      if (!res.ok) {
        toast.error("Error", {
          description: "Failed to load product detail",
          position: "top-right",
          richColors: true,
        });
        throw new Error("Failed to load product detail");
      }
      const result = await res.json();
      if (result.status === 200) {
        console.log("products by category", result.data);
        setProducts(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select
            value={selectedParent?.id.toString() || ""}
            onValueChange={(value) => {
              const selected =
                parentCategories.find(
                  (category) => category.id === Number(value),
                ) || null;
              setSelectedParent(selected);
              setSelectedChild(null);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select main category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {parentCategories.length > 0 ? (
                  parentCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled key="empty" value="empty">
                    Empty
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={selectedChild?.id.toString() || ""}
            onValueChange={(value) => {
              const selected =
                childCategories.find(
                  (category) => category.id === Number(value),
                ) || null;
              setSelectedChild(selected);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a child category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filteredChildCategories.length > 0 ? (
                  filteredChildCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled key="empty" value="empty">
                    Empty
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openNewCategoryDialog}>Add category</Button>
        <Button onClick={handleProductByCategtory}>Search products</Button>
      </div>
      <div className="rounded-md bg-neutral-200 px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-semibold">
            {selectedChild?.name ||
              selectedParent?.name ||
              "No category selected"}
          </p>
          <div className="flex gap-1">
            <Button variant="ghost" className="grid size-8 place-items-center">
              <PenBox />
            </Button>
            <Button variant="ghost" className="grid size-8 place-items-center">
              <Trash2 />
            </Button>
          </div>
        </div>
        <p className="text-gray-500">
          {selectedChild?.description ||
            selectedParent?.description ||
            "No description available"}
        </p>
      </div>
      <div>
        <p className="text-xl font-semibold">Products (1)</p>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Sizes</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
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
                  <TableCell className="w-[100px]">
                    <div className="flex w-[100px] gap-2">
                      {/* <Button
                        variant="ghost"
                        size="sm"
                        className="grid place-items-center"
                        onClick={() => handleGetProductDetail(product.id)}
                      >
                        <PenLine className="h-4 w-4" />
                      </Button> */}
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
          </Table>
        </div>
      </div>
      <NewCategoryDialog ref={NewCategoryDialogRef} />
    </div>
  );
};

export default CategorySection;

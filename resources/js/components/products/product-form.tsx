import ProductController from "@/actions/App/Http/Controllers/ProductController";
import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProductResponse } from "@/types/product.type";
import { useForm } from "@inertiajs/react";
import { useEffect, useMemo, useRef } from "react";
import { useCategoryContext } from "../categories/category-provider";
import TagInput from "../custom-components/tag-input";
import { Spinner } from "../ui/spinner";

interface ProductFormProps {
  initialData?: IProductResponse;
  setOpen: (open: boolean) => void;
}
const ProductForm = ({ initialData, setOpen }: ProductFormProps) => {
  const { store, update } = ProductController;
  const {
    parentCategories,
    childCategories,
    selectedParent,
    setSelectedParent,
    setSelectedChild,
  } = useCategoryContext();
  const initiateForm = useRef<boolean>(false);
  const { data, post, put, setData, processing, errors } = useForm({
    name: initialData?.name || "",
    description: initialData?.description || "",
    unit: initialData?.unit || "",
    price: initialData?.price || 0,
    cost: initialData?.cost || 0,
    mainCategory: initialData?.mainCategory || null,
    subCategory: initialData?.subCategory || null,
    tags: initialData?.tags || [],
    sizes: initialData?.sizes || [],
  });

  const filteredChildCategories = useMemo(() => {
    if (!selectedParent) return [];
    return childCategories.filter(
      (category) => category.parentId === selectedParent.id,
    );
  }, [childCategories, selectedParent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?.id) {
      put(update.url(initialData.id), {
        onSuccess: () => {
          setOpen(false);
        },
      });
    } else {
      post(store.url(), {
        onSuccess: () => {
          setOpen(false);
        },
      });
    }
  };

  const onParentCategoryChange = (value: string) => {
    const selected =
      parentCategories.find((category) => category.id === Number(value)) ||
      null;
    setSelectedParent(selected);
    setData({
      ...data,
      mainCategory: value,
      subCategory: initiateForm.current ? initialData?.subCategory : null,
    });
    setSelectedChild(null);
    if (initiateForm.current) {
      initiateForm.current = false;
    }
  };

  useEffect(() => {
    if (initiateForm.current && initialData) {
      const selected =
        parentCategories.find(
          (category) => category.id === Number(initialData?.mainCategory),
        ) || null;
      setSelectedParent(selected);
      initiateForm.current = false;
    }
  }, [initiateForm, initialData, parentCategories]);

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
      <div className="flex-1 px-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="name">Main category</Label>
            <Select
              value={data.mainCategory?.toString() || ""}
              onValueChange={onParentCategoryChange}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select main category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Main category</SelectLabel>
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
            {errors.mainCategory && (
              <p className="mt-1 text-sm text-red-600">{errors.mainCategory}</p>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="name">Sub category</Label>
            <Select
              value={data.subCategory?.toString() || ""}
              onValueChange={(value) => {
                setData({ ...data, subCategory: value });
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a sub category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sub category</SelectLabel>
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
        </div>

        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter product name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="description">Product Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Enter product description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="unit">Product unit</Label>
          <Input
            id="unit"
            name="unit"
            placeholder="Enter product unit"
            value={data.unit}
            onChange={(e) => setData({ ...data, unit: e.target.value })}
          />
        </div>
        <div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={(e) =>
                setData({ ...data, price: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              name="cost"
              placeholder="Enter product cost"
              value={data.cost}
              onChange={(e) =>
                setData({ ...data, cost: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagInput
              id="tags"
              placeholder="Enter product tags"
              value={data.tags}
              onChange={(value) => setData({ ...data, tags: value })}
            />
          </div>
          <div>
            <Label htmlFor="sizes">Sizes</Label>
            <TagInput
              id="sizes"
              placeholder="Enter product sizes"
              value={data.sizes}
              onChange={(value) => setData({ ...data, sizes: value })}
            />
          </div>
        </div>
      </div>
      <DrawerFooter className="flex flex-row justify-end gap-2">
        <Button type="submit" disabled={processing}>
          {processing ? <Spinner /> : null} Submit
        </Button>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DrawerFooter>
    </form>
  );
};

export default ProductForm;

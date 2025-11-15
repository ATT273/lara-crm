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
import { mainCategory, subCategory } from "@/constants/data.constants";
import { IProductResponse } from "@/types/product.type";
import { useForm } from "@inertiajs/react";
import TagInput from "../custom-components/tag-input";
import { Spinner } from "../ui/spinner";

interface ProductFormProps {
  initialData?: IProductResponse;
  setOpen: (open: boolean) => void;
}
const ProductForm = ({ initialData, setOpen }: ProductFormProps) => {
  const { store, update } = ProductController;

  const { data, post, put, setData, processing, errors } = useForm({
    name: initialData?.name || "",
    description: initialData?.description || "",
    unit: initialData?.unit || "",
    price: initialData?.price || 0,
    cost: initialData?.cost || 0,
    mainCategory: initialData?.mainCategory || 0,
    subCategory: initialData?.subCategory || 0,
    tags: initialData?.tags || [],
    sizes: initialData?.sizes || [],
  });

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

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
      <div className="flex-1 px-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="name">Main category</Label>
            <Select
              value={data.mainCategory.toString()}
              onValueChange={(value) => {
                setData({ ...data, mainCategory: Number(value) });
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select main category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Main category</SelectLabel>
                  {mainCategory.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
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
              value={data.subCategory.toString()}
              onValueChange={(value) => {
                setData({ ...data, subCategory: Number(value) });
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a sub category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sub category</SelectLabel>
                  {subCategory.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
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

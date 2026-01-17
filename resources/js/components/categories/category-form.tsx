import { useForm } from "@inertiajs/react";

import CategoryController from "@/actions/App/Http/Controllers/CategoryController";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ICategoryResponse } from "@/types/category.type";
import { router } from "@inertiajs/react";
import { Spinner } from "../ui/spinner";
import { useCategoryContext } from "./category-provider";
interface NewCategoryDialogProps {
  initialData?: ICategoryResponse;
  setOpen: (open: boolean) => void;
}

const CategoryForm = ({ initialData, setOpen }: NewCategoryDialogProps) => {
  const { store, update } = CategoryController;
  const { parentCategories, isEditing, setIsEditing } = useCategoryContext();
  const { data, put, post, setData, processing } = useForm<
    Omit<ICategoryResponse, "id">
  >({
    name: isEditing && initialData ? initialData.name : "",
    parentId: isEditing && initialData ? initialData.parentId : null,
    description: isEditing && initialData ? initialData.description : "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && initialData) {
      put(update.url(initialData.id), {
        onSuccess: () => {
          setOpen(false);
          setIsEditing(false);
          resetForm();
          router.reload({ only: ["data"] });
        },
      });
    } else {
      post(store.url(), {
        onSuccess: () => {
          setOpen(false);
          setIsEditing(false);
          resetForm();
          router.reload({ only: ["data"] });
        },
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      parentId: null,
      description: "",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Label className="min-w-[120px]">Parent category:</Label>
          <Select
            value={data.parentId?.toString() || ""}
            onValueChange={(value) => {
              setData((prev) => ({ ...prev, parentId: Number(value) }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select parent category" />
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
        </div>
        <div className="flex items-center gap-2">
          <Label className="min-w-[120px]">Name: </Label>
          <Input
            placeholder="Enter category name"
            value={data?.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Description"
            value={data?.description}
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={"ghost"}
          onClick={() => {
            setIsEditing(false);
            setOpen(false);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={processing}>
          {processing ? <Spinner /> : null} Save
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;

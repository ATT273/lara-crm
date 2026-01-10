import { PenBox, Trash2 } from "lucide-react";
import { useMemo, useRef } from "react";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useCategoryContext } from "./category-provider";
import NewCategoryDialog, { NewCategoryDialogRef } from "./new-category-dialog";

const CategorySection = () => {
  const NewCategoryDialogRef = useRef<NewCategoryDialogRef>(null);

  const {
    parentCategories,
    childCategories,
    selectedChildId,
    selectedParentId,
    setIsEditing,
    setSelectedParentId,
    setSelectedChildId,
  } = useCategoryContext();

  const filteredChildCategories = useMemo(() => {
    if (!selectedParentId) return [];
    return childCategories.filter(
      (category) => category.parentId === selectedParentId,
    );
  }, [childCategories, selectedParentId]);

  const selectedCategory = useMemo(() => {
    if (selectedChildId) {
      return (
        childCategories.find((category) => category.id === selectedChildId) ||
        null
      );
    }
    if (selectedParentId) {
      return (
        parentCategories.find((category) => category.id === selectedParentId) ||
        null
      );
    }
    return null;
  }, [selectedChildId, selectedParentId, childCategories, parentCategories]);

  const openNewCategoryDialog = () => {
    NewCategoryDialogRef.current?.open();
  };
  const openEditCategoryDialog = () => {
    setIsEditing(true);
    NewCategoryDialogRef.current?.open();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select
            value={selectedParentId?.toString() || ""}
            onValueChange={(value) => {
              setSelectedParentId(value ? Number(value) : undefined);
              setSelectedChildId(undefined);
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
            value={selectedChildId?.toString() || ""}
            onValueChange={(value) => {
              setSelectedChildId(value ? Number(value) : undefined);
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
      </div>
      <div className="rounded-md bg-neutral-200 px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-semibold">
            {selectedCategory?.name ||
              selectedCategory?.name ||
              "No category selected"}
          </p>
          {selectedCategory && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                className="grid size-8 place-items-center"
                onClick={openEditCategoryDialog}
              >
                <PenBox />
              </Button>
              <Button
                variant="ghost"
                className="grid size-8 place-items-center"
              >
                <Trash2 />
              </Button>
            </div>
          )}
        </div>
        <p className="text-gray-500">
          {selectedCategory?.description ||
            selectedCategory?.description ||
            "No description available"}
        </p>
      </div>

      <NewCategoryDialog
        ref={NewCategoryDialogRef}
        initialData={selectedCategory || undefined}
      />
    </div>
  );
};

export default CategorySection;

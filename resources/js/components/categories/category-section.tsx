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
    selectedChild,
    selectedParent,
    setSelectedChild,
    setSelectedParent,
  } = useCategoryContext();

  const filteredChildCategories = useMemo(() => {
    if (!selectedParent) return [];
    return childCategories.filter(
      (category) => category.parentId === selectedParent.id,
    );
  }, [childCategories, selectedParent]);

  const openNewCategoryDialog = () => {
    NewCategoryDialogRef.current?.open();
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

      <NewCategoryDialog ref={NewCategoryDialogRef} />
    </div>
  );
};

export default CategorySection;

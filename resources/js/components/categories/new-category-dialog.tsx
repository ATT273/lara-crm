import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ICategoryResponse } from "@/types/category.type";
import { useImperativeHandle, useState } from "react";
import CategoryForm from "./category-form";

interface NewCategoryDialogProps {
  ref: React.Ref<NewCategoryDialogRef>;
  initialData?: ICategoryResponse;
}

export interface NewCategoryDialogRef {
  open: () => void;
  close: () => void;
}

const NewCategoryDialog = ({ ref, initialData }: NewCategoryDialogProps) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <CategoryForm initialData={initialData} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryDialog;

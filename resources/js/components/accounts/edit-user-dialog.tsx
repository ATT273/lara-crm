import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import accounts from "@/routes/accounts";
import { IAccountResponse } from "@/types/account.type";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData?: IAccountResponse;
}

const ROLES = [
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
  { label: "Manager", value: "MANAGER" },
];
const initialData = {
  name: "",
  active: false,
  roleCode: "",
};

const EditUserDialog = ({
  open,
  onOpenChange,
  userData,
}: EditUserDialogProps) => {
  const { data, put, setData, processing } = useForm({
    name: initialData?.name || "",
    roleCode: initialData?.roleCode || "",
    active: initialData?.active || false,
  });

  useEffect(() => {
    if (userData) {
      setData({
        name: userData.name,
        active: userData.active === 1,
        roleCode: userData.roleCode,
      });
    }
  }, [userData]);

  const onEdit = () => {
    if (userData) {
      put(accounts.update.url(userData!.id), {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Modify the user details and settings below.
          </DialogDescription>
        </DialogHeader>
        {/* Form fields for editing user details would go here */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Label className="min-w-[120px]">Active: </Label>
            <Switch
              id="account-active"
              checked={data?.active}
              onCheckedChange={(checked) =>
                setData((prev) => ({ ...prev, active: checked }))
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="min-w-[120px]">Name: </Label>
            <Input
              placeholder="Enter name of user"
              value={data?.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="min-w-[120px]">Role: </Label>
            <Select
              value={data?.roleCode.toString()}
              onValueChange={(value) => {
                setData({ ...data, roleCode: value });
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a sub category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant={"ghost"} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onEdit} disabled={processing}>
            Save - {processing ? "..." : "Now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;

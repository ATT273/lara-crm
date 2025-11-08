import ProductController from "@/actions/App/Http/Controllers/ProductController";
import { IProductResponse } from "@/types/product.type";
// import { Link } from "@inertiajs/react";
import { IAccountResponse } from "@/types/account.type";
import { PenLine, Trash2, UserCog } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AssignRoleDialog from "./assign-role-dialog";

interface AccountTableProps {
  accounts: IAccountResponse[];
}
const AccountTable = ({ accounts }: AccountTableProps) => {
  const { show } = ProductController;
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    IProductResponse | undefined
  >();

  const handleGetProductDetail = async (productId: number) => {
    try {
      const res = await fetch(show.url(productId));
      if (!res.ok) throw new Error("Failed to load product detail");
      const result = await res.json();
      if (result.status === 200) {
        setSelectedProduct(result.data);
        setOpenEditDrawer(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-center">Active</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="overflow-hidden text-ellipsis">
                {account.name}
              </TableCell>
              <TableCell className="w-[200px]">{account.email}</TableCell>
              <TableCell className="w-[100px]">
                <div className="flex items-center">
                  {account.roleCode}USER
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 inline-grid cursor-pointer place-items-center p-0"
                  >
                    <UserCog className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="w-[120px]">
                <div className="flex w-[100px] items-center justify-center">
                  {account.active ? (
                    <div className="size-4 rounded-full bg-green-500 p-1" />
                  ) : (
                    <div className="size-4 rounded-full bg-gray-300 p-1" />
                  )}
                </div>
              </TableCell>
              <TableCell className="w-[100px]">
                <div className="flex w-[100px] gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="grid place-items-center"
                    onClick={() => handleGetProductDetail(account.id)}
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
      </Table>
      <AssignRoleDialog
      // open={openEditDrawer}
      // onOpenChange={setOpenEditDrawer}
      // initialData={selectedProduct}
      />
    </div>
  );
};

export default AccountTable;

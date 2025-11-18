import { MANAGEMENT_LEVELS } from "@/constants/role.constants";
import { checkRole } from "@/lib/utils";
import { IAccountResponse } from "@/types/account.type";
import { PenLine, Trash2 } from "lucide-react";
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
import { useAccountContext } from "./account-provider";
import EditUserDialog from "./edit-user-dialog";

interface AccountTableProps {
  accounts: IAccountResponse[];
}
const AccountTable = ({ accounts }: AccountTableProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    IAccountResponse | undefined
  >();
  const { userAuth } = useAccountContext();

  const handleGetUserDetail = async (user: IAccountResponse) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
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
                <div className="flex items-center">{account.roleCode}</div>
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
                    onClick={() => handleGetUserDetail(account)}
                    // disabled={
                    //   !checkRole(userAuth?.roleCode ?? "", MANAGEMENT_LEVELS)
                    // }
                  >
                    <PenLine className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="grid place-items-center"
                    disabled={
                      !checkRole(userAuth?.roleCode ?? "", MANAGEMENT_LEVELS)
                    }
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditUserDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        userData={selectedUser}
      />
    </div>
  );
};

export default AccountTable;

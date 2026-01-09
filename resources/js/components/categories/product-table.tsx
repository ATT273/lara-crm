import { formatCurrency } from "@/lib/utils";
import { IProductResponse } from "@/types/product.type";
import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ProductTable = ({ data }: { data: IProductResponse[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Sizes</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
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
  );
};

export default ProductTable;

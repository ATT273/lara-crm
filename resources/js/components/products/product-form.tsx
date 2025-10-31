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
import { Form } from "@inertiajs/react";

const ProductForm = () => {
  return (
    <Form
      {...ProductController.store.form()}
      options={{
        preserveScroll: true,
      }}
    >
      <div className="px-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="name">Main category</Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="name">Sub category</Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" placeholder="Enter product name" />
        </div>
        <div>
          <Label htmlFor="description">Product Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Enter product description"
          />
        </div>
        <div>
          <Label htmlFor="unit">Product unit</Label>
          <Input id="unit" name="unit" placeholder="Enter product unit" />
        </div>
        <div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" placeholder="Enter product price" />
          </div>
          <div>
            <Label htmlFor="cost">Cost</Label>
            <Input id="cost" name="cost" placeholder="Enter product cost" />
          </div>
        </div>
        <div>
          <div>
            <Label htmlFor="tag">Tag</Label>
            <Input id="tag" placeholder="Enter product tag" />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Input id="size" placeholder="Enter product size" />
          </div>
        </div>
        <div>
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
      </div>
      <DrawerFooter>
        <Button type="submit">Submit</Button>
        <Button variant="outline">Cancel</Button>
        {/* <DrawerClose>
        </DrawerClose> */}
      </DrawerFooter>
    </Form>
  );
};

export default ProductForm;

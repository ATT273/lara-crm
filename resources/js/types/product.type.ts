export interface IProductResponse {
  id: number;
  name: string;
  description: string;
  unit: string;
  price: number;
  cost: number;
  mainCategory: string;
  subCategory: string;
  tags?: string[];
  sizes?: string[];
  images?: {
    id: number;
    url: string;
  }[];
  created_at: string;
  updated_at: string;
}

"use client";

import { ICategoryResponse } from "@/types/category.type";
import { createContext, useContext, useMemo } from "react";

type CategoryContextType = {
  parentCategories: ICategoryResponse[];
  childCategories: ICategoryResponse[];
};

type CategoryProviderProps = {
  children: React.ReactNode;
  categoriesResponse?: ICategoryResponse[];
};
const CategoryContext = createContext<CategoryContextType | null>(null);

const CategoryProvider = ({
  children,
  categoriesResponse,
}: CategoryProviderProps) => {
  const parentCategories = useMemo(() => {
    if (!categoriesResponse) return [];
    return categoriesResponse.filter((category) => category.parentId === null);
  }, [categoriesResponse]);

  const childCategories = useMemo(() => {
    if (!categoriesResponse) return [];
    return categoriesResponse.filter((category) => category.parentId !== null);
  }, [categoriesResponse]);

  return (
    <CategoryContext.Provider value={{ parentCategories, childCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider",
    );
  }
  return context;
};

export default CategoryProvider;

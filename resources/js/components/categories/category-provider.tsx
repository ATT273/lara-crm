"use client";

import { ICategoryResponse } from "@/types/category.type";
import { createContext, useContext, useMemo, useState } from "react";

type CategoryContextType = {
  parentCategories: ICategoryResponse[];
  childCategories: ICategoryResponse[];
  selectedParent: ICategoryResponse | null;
  selectedChild: ICategoryResponse | null;
  setSelectedParent: React.Dispatch<
    React.SetStateAction<ICategoryResponse | null>
  >;
  setSelectedChild: React.Dispatch<
    React.SetStateAction<ICategoryResponse | null>
  >;
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
  const [selectedParent, setSelectedParent] =
    useState<ICategoryResponse | null>(null);
  const [selectedChild, setSelectedChild] = useState<ICategoryResponse | null>(
    null,
  );
  const parentCategories = useMemo(() => {
    if (!categoriesResponse) return [];
    return categoriesResponse.filter((category) => category.parentId === null);
  }, [categoriesResponse]);

  const childCategories = useMemo(() => {
    if (!categoriesResponse) return [];
    return categoriesResponse.filter((category) => category.parentId !== null);
  }, [categoriesResponse]);

  return (
    <CategoryContext.Provider
      value={{
        parentCategories,
        childCategories,
        selectedChild,
        selectedParent,
        setSelectedChild,
        setSelectedParent,
      }}
    >
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

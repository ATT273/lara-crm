"use client";

import { ICategoryResponse } from "@/types/category.type";
import { createContext, useContext, useMemo, useState } from "react";

type CategoryContextType = {
  parentCategories: ICategoryResponse[];
  childCategories: ICategoryResponse[];
  selectedParentId?: number;
  selectedChildId?: number;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedParentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedChildId: React.Dispatch<React.SetStateAction<number | undefined>>;
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
  const [selectedParentId, setSelectedParentId] = useState<number>();
  const [selectedChildId, setSelectedChildId] = useState<number>();

  const [isEditing, setIsEditing] = useState(false);
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
        selectedChildId,
        selectedParentId,
        isEditing,
        setIsEditing,
        setSelectedChildId,
        setSelectedParentId,
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

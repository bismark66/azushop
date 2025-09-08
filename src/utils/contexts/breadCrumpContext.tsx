// utils/contexts/BreadcrumbContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface BreadcrumbItem {
  path: string;
  label: string;
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  appendBreadcrumb: (path: string, label: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};

interface BreadcrumbProviderProps {
  children: ReactNode;
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({
  children,
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const appendBreadcrumb = (path: string, label: string) => {
    setBreadcrumbs((prev) => {
      // Check if the breadcrumb already exists
      const exists = prev.some((item) => item.path === path);
      if (exists) return prev;

      return [...prev, { path, label }];
    });
  };

  return (
    <BreadcrumbContext.Provider
      value={{ breadcrumbs, setBreadcrumbs, appendBreadcrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

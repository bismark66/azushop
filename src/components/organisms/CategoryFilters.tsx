import { Grid } from "@mantine/core";
import { LinksGroup } from "../molecules/LinksGroup";

interface CategoryFiltersProps {
  data: any[];
  onBrandChange?: (brand: string) => void;
  onCategoryChange?: (category: string) => void;
  selectedBrands?: string[];
  selectedCategories?: string[];
}

function CategoryFilters({
  data,
  onBrandChange,
  onCategoryChange,
  selectedBrands = [],
  selectedCategories = [],
}: CategoryFiltersProps) {
  const enhancedData = data.map((item) => ({
    ...item,
    links: item.links.map((link: any) => ({
      ...link,
      // Add click handlers based on the type of filter
      onClick: () => {
        if (onBrandChange && link.value) {
          onBrandChange(link.value);
        } else if (onCategoryChange && link.value) {
          onCategoryChange(link.value);
        }
      },
    })),
  }));

  const links = enhancedData.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      selectedBrands={selectedBrands}
      selectedCategories={selectedCategories}
    />
  ));

  return (
    <>
      <Grid>
        <Grid.Col span={12}>{links}</Grid.Col>
      </Grid>
    </>
  );
}

export default CategoryFilters;

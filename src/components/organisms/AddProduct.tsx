import {
  Box,
  Button,
  SimpleGrid,
  Input,
  Select,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import FileInput from "../molecules/FileInput";
import {
  useGetAllCategories,
  useAddProduct,
  useUploadImage,
} from "../../http/product.mutations";

export default function AddProductForm() {
  const { data: categoriesData, isPending, isError } = useGetAllCategories();
  const addProductMutation = useAddProduct();
  const form = useForm<{
    name: string;
    price: string;
    quantity: string;
    brand: string;
    countInStock: string;
    category: string;
    description: string;
    file: File | null;
  }>({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      brand: "",
      countInStock: "",
      category: "",
      description: "",
      file: null,
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Name is too short" : null),
      price: (value) => (value === "" ? "Price is required" : null),
      quantity: (value) => (value === "" ? "Quantity is required" : null),
      brand: (value) => (value.trim().length < 2 ? "Brand is too short" : null),
      countInStock: (value) =>
        value === "" ? "Count in stock is required" : null,
      category: (value) => (value === "" ? "Category is required" : null),
      description: (value) =>
        value.trim().length < 5 ? "Description is too short" : null,
      file: (value: File | null) =>
        value === null ? "Image is required" : null,
    },
  });

  const handleFileChange = (file: File | null) => {
    form.setFieldValue("file", file);
  };

  const uploadImageMutation = useUploadImage();

  const handleSubmit = async (values: typeof form.values) => {
    if (addProductMutation.isPending) return; // Prevent multiple submissions
    let imageUrl = "";
    if (values.file) {
      const imageFormData = new FormData();
      imageFormData.append("image", values.file);
      try {
        const res = await uploadImageMutation.mutateAsync(imageFormData);
        imageUrl = res.image;
      } catch {
        alert("Image upload failed");
        return;
      }
    }
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("brand", values.brand);
    formData.append("countInStock", values.countInStock);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("image", imageUrl);
    await addProductMutation.mutateAsync(formData, {
      onSuccess: () => {
        alert("Product added successfully");
        form.reset();
      },
    });
  };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  // No need to manually fetch, useQuery runs automatically

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        console.log("Submitting", values);
        await handleSubmit(values);
      })}
    >
      {form.values.file && (
        <Box
          mb={16}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={URL.createObjectURL(form.values.file)}
            alt="Product preview"
            style={{
              maxWidth: 220,
              maxHeight: 220,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
          <Button
            mt={8}
            size="xs"
            color="red"
            radius="md"
            onClick={() => form.setFieldValue("file", null)}
          >
            Remove
          </Button>
        </Box>
      )}
      <Box mb={24} style={{ display: "flex", justifyContent: "center" }}>
        <FileInput onFileChange={handleFileChange} />
      </Box>
      <SimpleGrid cols={2} spacing={16} mb={16}>
        <Input
          placeholder="Name"
          size="lg"
          radius="md"
          style={{ background: "#F9FBFC" }}
          {...form.getInputProps("name")}
        />
        <Input
          placeholder="Price"
          size="lg"
          radius="sm"
          style={{ background: "#F9FBFC" }}
          type="number"
          {...form.getInputProps("price")}
        />
      </SimpleGrid>
      <SimpleGrid cols={2} spacing={16} mb={16}>
        <Input
          placeholder="Quantity"
          size="lg"
          radius="md"
          style={{ background: "#F9FBFC" }}
          type="number"
          {...form.getInputProps("quantity")}
        />
        <Input
          placeholder="Brand"
          size="lg"
          radius="md"
          style={{ background: "#F9FBFC" }}
          {...form.getInputProps("brand")}
        />
      </SimpleGrid>
      <SimpleGrid cols={2} spacing={16} mb={16}>
        <Input
          placeholder="Count in stock"
          size="lg"
          radius="md"
          style={{ background: "#F9FBFC" }}
          type="number"
          {...form.getInputProps("countInStock")}
        />
        <Select
          placeholder={
            isPending
              ? "Loading..."
              : isError
              ? "Failed to load categories"
              : "Category"
          }
          data={
            categoriesData
              ? categoriesData.map((cat: { _id: string; name: string }) => ({
                  value: cat._id,
                  label: cat.name,
                }))
              : []
          }
          size="lg"
          radius="md"
          style={{ background: "#F9FBFC" }}
          {...form.getInputProps("category")}
          disabled={isPending || isError}
          error={isError ? "Could not load categories" : undefined}
        />
      </SimpleGrid>
      <Textarea
        placeholder="Description"
        size="xl"
        radius="md"
        minRows={8}
        mb={24}
        style={{ background: "#F9FBFC" }}
        {...form.getInputProps("description")}
      />
      <Button
        type="submit"
        color="blue"
        radius="md"
        size="md"
        style={{
          width: 180,
          fontWeight: 600,
          margin: "0 auto",
          display: "block",
        }}
      >
        Submit
      </Button>
    </form>
  );
}

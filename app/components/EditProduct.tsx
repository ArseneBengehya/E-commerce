import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Textarea,
  Select,
} from "@mantine/core";
import { useProductStore } from "../store/useProductStore";
import { useAppContext } from "../context";

const EditProduct = ({ opened, onClose, title, size }: any) => {
  const inputClasses = {
    label: "!text-gray-900 !font-medium !text-xs",
    input:
      "!bg-white !border !border-gray-300  !text-gray-900  !rounded-md focus:!border-primary !text-xs",
    dropdown: "!bg-white text-gray-900  !border !border-gray-300 ",
    option: "hover:!bg-gray-100",
  };

  const { item } = useAppContext();

  const [formData, setFormData] = useState({
    id:item.id || "",
    name: item.name || "",
    price: item.price || 0,
    stock: item.stock || "",
    image: item.image || "",
    categoryId: item.categoryId || "",
    description: item.description || "",
  });

  const { isActionLoading, categories, updateProduct } = useProductStore();

  const categorieOptions = useMemo(
    () =>
      categories
        .filter((c) => c.isDelete === false)
        .map((category) => ({
          value: category.id,
          label: category.name,
        })),
    [categories],
  );

  const resetInputs = () => {
    setFormData({
      id:"",
      name: "",
      price: 0,
      stock: 0,
      image: "",
      categoryId: "",
      description: "",
    });
  };

  const handleSubmit = async () => {
    await updateProduct(formData);
    onClose();
    resetInputs();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        resetInputs();
      }}
      title={title}
      size={size}
      centered
      classNames={{
        content: "!bg-white",
        body: "!bg-white !text-gray-900",
        header: "!bg-white !text-gray-900  !border-b !border-gray-200",
        title: "!text-primary !font-bold !text-xl",
        close: "!text-gray-700 hover:!bg-gray-200",
      }}
    >
      <form className="relative w-full">
        <Stack gap="md" className="p-2 w-full">
          <TextInput
            label="Nom du produit"
            placeholder="Ex: Ordinateur HP"
            classNames={inputClasses}
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
          />

          <div className="flex items-center justify-between gap-1">
            <TextInput
              label="Prix unitaire"
              className="flex-1 w/2"
              placeholder="Ex: 200"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              classNames={inputClasses}
              required
            />

            <TextInput
              label="Stock"
              className="flex-1 w/2"
              placeholder="Ex: 10"
              value={formData.stock}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  stock: Number(e.target.value),
                }))
              }
              classNames={inputClasses}
              required
            />
          </div>
          <TextInput
            label="Lien de l'image"
            placeholder="Ex: https://..."
            value={formData.image}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: e.target.value,
              }))
            }
            classNames={inputClasses}
            required
          />

          <Select
            label="Catégorie du produit"
            placeholder="Choisir une catégorie"
            data={categorieOptions}
            value={formData.categoryId}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, categoryId: value || "" }))
            }
            classNames={inputClasses}
            required
          />

          <Textarea
            resize="vertical"
            label="Description du produit"
            placeholder="Votre mot..."
            size="xs"
            classNames={inputClasses}
            minRows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value || "",
              }))
            }
          />
          <Button
            className="!bg-primary"
            type="submit"
            loading={isActionLoading}
            disabled={isActionLoading}
            onClick={handleSubmit}
          >
            {isActionLoading ? "" : "Modifier"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditProduct;

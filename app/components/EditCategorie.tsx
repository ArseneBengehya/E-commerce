import React, { useEffect, useState } from "react";
import { Modal, TextInput, Button, Stack } from "@mantine/core";
import { useAppContext } from "../context/index";
import { useProductStore } from "../store/useProductStore";

const EditCategorie = ({ opened, onClose, title, size }: any) => {
  const { updateCategory, isActionLoading } = useProductStore();
  const { item } = useAppContext();

  const [name, setName] = useState(item?.name || "");
  const [slug, setSlug] = useState(item?.slug || "");
  const [id, setId] = useState(item?.id || "");
  const handleSubmit = async () => {
    await updateCategory(id, name, slug);
    onClose();
  };
  const inputClasses = {
    label: "!text-gray-900 !font-medium !text-xs",
    input:
      "!bg-white !border !border-gray-300  !text-gray-900  !rounded-md focus:!border-primary !text-xs",
    dropdown: "!bg-white text-gray-900  !border !border-gray-300 ",
    option: "hover:!bg-gray-100",
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
      <form className="relative">
        <Stack gap="md" className="p-2">
          <TextInput
            label="Nom de la categorie"
            placeholder="item..."
            classNames={inputClasses}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextInput
            label="Slug"
            placeholder="item..."
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            classNames={inputClasses}
            required
          />

          <Button
            className="!bg-primary"
            type="submit"
            loading={isActionLoading}
            disabled={isActionLoading}
            onClick={handleSubmit}
          >
            {isActionLoading ? "" : "Enregistrer"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditCategorie;

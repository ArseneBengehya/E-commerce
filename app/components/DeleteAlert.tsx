"use client"
import React, { useState } from "react";
import { Button, Modal, Select } from "@mantine/core";
import { useAppContext } from "../context/index";

interface props {
  opened: boolean;
  onClose: () => void;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  message?: string;
  delFunction?: ((id: any) => void) | undefined; 
}

const DeleteAlert = ({ opened, onClose, title, size, message,delFunction }: props) => {
  const { item,id } = useAppContext();

  const handleSubmit = () => {
    delFunction?.(id)
    onClose();
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={onClose}
        title={title}
        size={size || "50%"}
        classNames={{
          content: "!bg-white dark:!bg-gray-900",
          body: "!bg-white dark:!bg-gray-900 !text-gray-900 dark:!text-gray-200",
          header:
            "!bg-white dark:!bg-gray-900 !text-gray-900 dark:!text-gray-200 !border-b !border-gray-200 dark:!border-gray-700",
          title: "!text-red-600 !font-bold !text-xl",
          close:
            "!text-gray-700 dark:!text-gray-50 hover:!bg-gray-200 dark:hover:!bg-gray-700",
        }}
        centered={true}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className="bg-white dark:bg-gray-900 p-4 transition duration-300 h-auto">
          <div className="text-sm py-2">{message}</div>
          <div className="flex gap-3">
            <Button
              variant="filled"
              className="mt-1"
              color="gray"
              onClick={() => onClose()}
              size="xs"
            >
              Annuler
            </Button>
            <Button
              variant="filled"
              className="mt-1"
              onClick={handleSubmit}
              color="red"
              size="xs"
            >
              Confirmer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAlert;

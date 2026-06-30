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
  isLoading:boolean | undefined;
  delFunction?: ((id: any) => void) | undefined; 
}

const DeleteAlert = ({ opened, onClose, title, size, message,delFunction, isLoading }: props) => {
  const { item,id } = useAppContext();

  const handleSubmit = () => {
    delFunction?.(id)
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={onClose}
        title={title}
        size={size || "50%"}
        classNames={{
          content: "!bg-white",
          body: "!bg-white !text-gray-900",
          header:
            "!bg-white !text-gray-900 !border-b !border-gray-200",
          title: "!text-red-600 !font-bold !text-xl",
          close:
            "!text-gray-700 hover:!bg-gray-200",
        }}
        centered={true}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className="bg-white p-4 transition duration-300 h-auto">
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
              loading={isLoading}
              color="red"
              size="xs"
            >
            {isLoading ? "" : "Confirmer"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAlert;

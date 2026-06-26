import React, { useState } from "react";
import { Modal, TextInput, Button, Group, Stack, Text, LoadingOverlay } from "@mantine/core";
import { useCartStore } from "@/app/store/useCartStore";
import { notifications } from "@mantine/notifications";

const PaymentModal = ({ opened, onClose }: any) => {
  const { checkout } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de la validation bancaire
    const result = await checkout();
    
    if (result.success) {
      notifications.show({ title: "Succès", message: "Paiement validé !", color: "green" });
      onClose();
    } else {
      notifications.show({ title: "Erreur", message: result.message, color: "red" });
    }
    setLoading(false);
  };
  const inputClasses = {
    label: "!text-gray-900 !font-medium !text-xs",
    input:
      "!bg-white !border !border-gray-300  !text-gray-900  !rounded-md focus:!border-blue-500 !text-xs",
    dropdown:
      "!bg-white text-gray-900  !border !border-gray-300 ",
    option: "hover:!bg-gray-100",
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Paiement sécurisé par carte"
      size="sm"
      centered
        classNames={{
          content: "!bg-white",
          body: "!bg-white !text-gray-900",
          header:
            "!bg-white !text-gray-900  !border-b !border-gray-200",
          title: "!text-primary !font-bold !text-xl",
          close:
            "!text-gray-700 hover:!bg-gray-200",
        }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <LoadingOverlay visible={loading} />
        
        <Stack gap="md" className="p-2">
          {/* LOGOS BANCAIRES */}
          <div className="flex gap-2 items-center mb-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
          </div>

          <TextInput
            label="Nom sur la carte"
            placeholder="John Doe"
            classNames={inputClasses}
            required
          />

          <TextInput
            label="Numéro de carte"
            placeholder="0000 0000 0000 0000"
            classNames={inputClasses}
            required
          />

          <Group grow>
            <TextInput
              label="Date d'expiration"
              placeholder="MM/YY"
              classNames={inputClasses}
              required
            />
            <TextInput
              label="CVC"
              placeholder="123"
              classNames={inputClasses}
              required
            />
          </Group>

          <Button 
            type="submit" 
            fullWidth 
            className="!bg-primary !mt-4 !py-5 !flex !items-center !justify-center"
            size="md"
          >
            Payer maintenant
          </Button>

          <Text size="xs" c="dimmed" ta="center">
            🔒 Paiement 100% sécurisé via chiffrement SSL
          </Text>
        </Stack>
      </form>
    </Modal>
  );
};

export default PaymentModal;
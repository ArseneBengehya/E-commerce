import { getSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { errorNotification } from './index';

export const checkAuth = async () => {
  const session = await getSession();
  
  if (!session) {
    errorNotification("Vous devez être connecté pour effectuer cette action.")
    return false;
  }
  return true;
};
import { toast } from 'react-toastify';
export const AppName ="KivuMarket"


export function getLocalStorageItem(key: string) {
  const item = localStorage.getItem(key as string);
  return item ? JSON.parse(item) : null;
}
export function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key as string);
}
export function setLocalStorageItem(key: string, value: any) {
  localStorage.setItem(key as string, JSON.stringify(value));
}

export const sucessNotification = (message: string) => {
  toast.success(message, {
    autoClose: 3000,
    position: "top-right",
  });
};

export const errorNotification = (message: string) => {
  toast.error(message, {
    autoClose: 3000,
    position: "top-right",
  });
};

export const pendingNotification = (message: string) => {
  toast.loading(message, {
    autoClose: 3000,
    position: "top-right",
  });
};

export const promisifyToast = async (
  promise: any,
  { pending }: { pending: string },
  options = {}
) => {
  return toast.promise(
    promise,
    {
      pending: pending || "Chargement...",

      success: {
        render({ data }) {
          return (data as any)?.message || "Opération réussie ✔️";
        },
      },

      error: {
        render({ data }) {
          return (data as any)?.message || "Une erreur est survenue ❌";
        },
      },
    },
    {
      autoClose: 3000,
      position: "top-right",
      ...options,
    }
  );
};

export const getRole = (role: any) => {
  return role === "user"
    ? "Utilisateur"
    : role === "admin"
    ? "Administrateur"
    : "N/A";
};

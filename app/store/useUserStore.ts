import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "ADMIN";
}

interface UserState {
  users: User[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  updateRole: (userId: string, newRole: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      set({ users: data });
    } catch (error) {
      console.error("Erreur chargement utilisateurs", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateRole: async (userId, newRole) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      body: JSON.stringify({ userId, role: newRole }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      // Mise à jour locale sans re-fetch pour une UX instantanée
      set((state) => ({
        users: state.users.map((u) => 
          u.id === userId ? { ...u, role: newRole as any } : u
        ),
      }));
    }
  },
}));
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let userStore = (set) => ({
  notifications: [],
  setNotifications: (data) => set((prev) => ({ notifications: [...prev.notifications, data] })),
  deleteNotification: (data) => set((prev) => ({ notifications: prev.notifications.filter((notification) => notification.id !== data.id) })),
  user: null,
  setUser: (data) => ({ user: data }),
});

userStore = devtools(userStore);
userStore = persist(userStore, { name: "user_data" });

export const useUserStore = create(userStore);

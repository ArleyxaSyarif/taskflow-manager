import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
    user: string | null;
    token: string | null;

    setAuth: (
        user: string,
        token: string
    ) => void;

    logout: () => void;
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({

            user: null,
            token: null,


            setAuth: (user, token) => {
                set({
                    user,
                    token
                });
            },


            logout: () => {
                set({
                    user: null,
                    token: null
                });
                toast.success("Logout berhasil");
            }

        }),
        {
            name: "auth-storage"
        }
    )
);
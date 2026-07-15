"use client";

import { useState } from "react";
import { loginApi } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

export default function LoginForm() {
    const setAuth = useAuthStore((state) => state.setAuth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Fitur tambahan agar password bisa di-toggle

    async function handleLogin(e) {
        e.preventDefault(); // Mencegah reload halaman saat submit form

        if (!username || !password) {
            toast.error("Username dan password wajib diisi");
            return;
        }
        

        setIsLoading(true);

        try {
            const data = await loginApi(username, password);

            setAuth(data.user, data.token);

            toast.success("Login berhasil");
            window.location.href = "/dashboard";
        } catch {
            toast.error("Username atau password salah");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-orange-500/20">
                        M
                    </div>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">ManageCO</span>
                </div>

                <h2 className="text-center text-2xl font-extrabold text-slate-800 tracking-tight">
                    Masuk ke Akun Anda
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Silakan masukkan kredensial Anda untuk mengakses dashboard
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
                <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">

                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Username
                            </label>
                            <input
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                                type="text"
                                placeholder="Masukkan username Anda"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>



                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-orange-500/10 text-sm font-semibold text-white transition-all active:scale-[0.98] mt-2 ${isLoading
                                ? "bg-orange-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Memproses...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
}
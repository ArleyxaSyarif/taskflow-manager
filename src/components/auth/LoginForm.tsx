import { useState } from "react";
import { loginApi } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";


export default function LoginForm() {


    const setAuth = useAuthStore(
        (state) => state.setAuth
    );


    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");



    async function handleLogin() {

        try {

            const data = await loginApi(
                username,
                password
            );


            setAuth(
                data.user,
                data.token
            );


            toast.success("Login berhasil");
            window.location.href = "/dashboard";




        } catch {

            toast.error(
                "Username atau password salah"
            );

        }

    }



    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
        ">

            <div className="
                border
                p-6
                rounded-xl
            ">

                <h1 className="
                    text-2xl
                    font-bold
                    mb-5
                ">
                    TaskFlow Login
                </h1>


                <input
                    className="border p-2 block mb-3"
                    placeholder="username"
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />


                <input
                    className="border p-2 block mb-3"
                    placeholder="password"
                    type="password"
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />


                <button
                    className="
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded
                    "
                    onClick={handleLogin}
                >
                    Login
                </button>


            </div>

        </div>

    );

}
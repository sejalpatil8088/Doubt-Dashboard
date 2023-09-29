
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import '../index.css';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const clickHandler = () => {

        const getEmail = document.getElementById("email");
        const emailTrue = getEmail.value
        setEmail(emailTrue);

        const getPassword = document.getElementById("password");
        const passwordTrue = getPassword.value

        setPassword(passwordTrue);


        if (token) {

            navigate("/dashboad")

        } else {

            console.log("email or password invalid or wrong");
        }
    }





    useEffect(() => {
        const sendPost = async () => {

            await axios({
                method: "post",
                url: "https://admin-api.pwskills.com/backend/login?jwtLogin=true",
                data: {
                    email: email,
                    password: password
                }
            }).then(
                (response) => {
                    const tok = response.data
                    const finalToken = tok.token
                    setToken(finalToken)
                    localStorage.setItem("user", JSON.stringify(token))
                }).catch((error) => console.log(error))

        }
        sendPost()
    }, [password, email, token])



    return (
        <>
            <div class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                <div class="relative py-3 sm:w-96 mx-auto text-center">
                    <span class="text-2xl font-light ">Login to your account</span>
                    <div class="mt-4 bg-white shadow-md rounded-lg text-left">
                        <div class="h-2 bg-blue-400 rounded-t-md"></div>
                        <div class="px-8 py-6 ">
                            <label class="block font-semibold">Email </label>
                            <input type="text" id="email" placeholder="Email" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <label class="block mt-3 font-semibold">Password</label>
                            <input type="password" id="password" placeholder="Password" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <div class="flex justify-between items-baseline">
                                <button onClick={() => clickHandler()} type="submit" class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

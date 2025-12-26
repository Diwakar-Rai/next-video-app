"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    if (result?.error) {
      console.log(result.error);
    } else {
      router.replace("/");
    }
  };
  return (
    <div className="formContainer">
      <form className="formClasses" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Email"
          className="inputClasses"
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Password"
          className="inputClasses"
          name="password"
          onChange={handleChange}
        />
        <button className="formBtn">Login</button>
      </form>
    </div>
  );
};

export default Login;

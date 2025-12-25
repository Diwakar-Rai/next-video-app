"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  let { email, password, confirmPassword } = registerData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration Failed");
      }
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="formClasses">
        <input
          type="text"
          value={email}
          onChange={handleChange}
          className="inputClasses"
          placeholder="Enter Email"
          name="email"
        />
        <input
          type="text"
          value={password}
          onChange={handleChange}
          className="inputClasses"
          placeholder="Enter Password"
          name="password"
        />
        <input
          type="text"
          value={confirmPassword}
          onChange={handleChange}
          className="inputClasses"
          placeholder="Confirm Password"
          name="confirmPassword"
        />
        <button type="submit" className="formBtn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

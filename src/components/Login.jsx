import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className="w-full m-auto bg-gray-200">
        <div className="mb-2 w-full">
          <span>
            <logo width="100%" />
          </span>
        </div>
        <h2 className="text-center">sign in to your account</h2>
        <p className="mt-2 text-center text-base">
          {`Don't have an account? `}
          <Link to="/signup" className="font-medium">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-3">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                matchPattern: (value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Email address must be vaid",
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

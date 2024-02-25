import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
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
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center">sign up to your account</h2>
        <p className="mt-2 text-center text-base">
          Already have an account?
          <Link to="/login" className="font-medium">
            Sign Up
          </Link>
        </p>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div>
            <Input
              label="Full Name: "
              placeholder="Enter full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

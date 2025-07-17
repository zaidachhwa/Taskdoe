import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

const userSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

interface Inputs {
  email: string;
  password: string;
  username: string;
}

const Signup: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(userSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    const { email, password, username } = data;
    try {
      const res = await axiosInstance.post("/users/register", {
        email: email,
        password: password,
        username: username,
      });

      console.log(res);
      if (res.data) {
        toast.success(res.data.message);
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const err: string = error.response.data.message;
      toast.error(err);
    } finally {
      reset();
    }
  };
  return (
    <div className="w-full h-screen bg-custom-bg flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 md:w-1/2 xl:w-1/3 rounded-lg bg-custom-secondary/30  shadow-lg flex flex-col items-center justify-center mx-auto p-2"
      >
        <h1 className="font-semibold text-3xl mt-5 text-custom-purple">
          Signup
        </h1>
        {/* Username */}
        <div className="w-full flex flex-col mt-10 gap-3">
          <label htmlFor="username" className="">
            Username
          </label>
          <input
            type="text"
            className="outline-0 border border-custom-purple p-1 lg:p-2 rounded-lg pl-4"
            placeholder="Enter your Username"
            {...register("username")}
          />
          <div className="text-sm text-red-400">
            {errors?.username?.message}
          </div>
        </div>
        {/* Email */}
        <div className="w-full flex flex-col mt-4 gap-3">
          <label htmlFor="username" className="">
            Email
          </label>
          <input
            type="email"
            className="outline-0 border border-custom-purple p-1 lg:p-2 rounded-lg pl-4"
            placeholder="Enter your Email"
            {...register("email")}
          />
          <div className="text-sm text-red-400">{errors?.email?.message}</div>
        </div>
        {/* Password */}
        <div className="w-full flex flex-col mt-4 gap-3">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            className="outline-0 border border-custom-purple p-1 lg:p-2 rounded-lg pl-4"
            placeholder="Enter your password"
            {...register("password")}
          />
          <div className="text-sm text-red-400">
            {errors?.password?.message}
          </div>
        </div>

        {/*  */}

        <div className="w-full flex flex-col my-5 gap-5 items-center justify-center">
          <button
            type="submit"
            className="bg-custom-purple cursor-pointer hover:bg-custom-purple/90 text-white w-10/12 p-2 rounded-lg"
          >
            Register
          </button>
          <p className="text-sm">
            Already have an Account?
            <Link to="/" className="ml-1 underline text-custom-purple">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

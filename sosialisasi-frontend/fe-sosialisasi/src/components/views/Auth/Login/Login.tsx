import { useState } from "react";
import { Form, Input, Checkbox, Button, Spinner } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import useLogin from "../../../hooks/useLogin";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="grid h-screen w-full lg:grid-cols-5">
      <div className="col-span-full flex h-full flex-col items-start justify-center gap-5 bg-[#122C49] px-6 sm:px-10 md:px-16 lg:col-span-2 lg:px-[6.25rem]">
        <h1 className="text-left text-2xl font-bold text-white">
          Welcome Back!
        </h1>
        <p className="text-base text-white">Please login to continue</p>
        <div className="w-full">
          <Form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full items-center justify-center space-y-4"
          >
            <div className="flex w-full flex-col gap-3">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Email"
                    labelPlacement="inside"
                    placeholder="Enter your email"
                    type="email"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Password"
                    labelPlacement="inside"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FaRegEye className="text-default-400 pointer-events-none text-xl" />
                        ) : (
                          <FaRegEyeSlash className="text-default-400 pointer-events-none text-xl" />
                        )}
                      </button>
                    }
                  />
                )}
              />
              {errors.root && (
                <p className="font-medium text-red-500">
                  {errors.root.message}
                </p>
              )}
              <div className="flex gap-4 pt-2">
                <Button className="w-full bg-[#CEB07E]" type="submit">
                  {isPendingLogin ? (
                    <Spinner color="white" size="sm"></Spinner>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <p className="w-full pt-2 text-center text-base text-white">
          Not a member?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-[#CEAE78] hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
      <div className="hidden h-full w-full overflow-hidden lg:col-span-3 lg:block">
        <img
          src="/images/auth_picture.webp"
          alt="auth_picture"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

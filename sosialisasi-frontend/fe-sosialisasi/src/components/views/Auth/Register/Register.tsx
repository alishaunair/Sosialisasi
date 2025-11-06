import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaCircle } from "react-icons/fa6";
import {
  Select,
  SelectItem,
  Form,
  Input,
  Button,
  Spinner,
} from "@heroui/react";
import useRegister, { RegisterFormData } from "../../../hooks/useRegister";
import Link from "next/link";
import { Controller, Path } from "react-hook-form";

const Register = () => {
  const [step, setStep] = useState(1);
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
    preview,
    trigger,
  } = useRegister();

  const handleNext = async () => {
    const fieldsStep1: Path<RegisterFormData>[] = [
      "fullName",
      "email",
      "status",
      "password",
      "confirmPassword",
    ];
    const isStep1Valid = await trigger(fieldsStep1);

    if (isStep1Valid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="grid h-screen w-full lg:grid-cols-5">
      <div className="col-span-full flex h-full flex-col items-start justify-center gap-5 bg-[#122C49] px-6 sm:px-10 md:px-16 lg:col-span-2 lg:px-[6.25rem]">
        <h1 className="text-left text-2xl font-bold text-white">
          {step === 1 ? "Join Sosialisasi" : "Lengkapi Data Diri"}
        </h1>
        <p className="text-base text-white">
          Find the best internship and job opportunities tailored for
          Information Systems students of Airlangga University!
        </p>
        <div className="w-full">
          <Form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full items-center justify-center space-y-4"
          >
            <div className="flex w-full flex-col gap-3">
              {step === 1 && (
                <>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        label="Full Name"
                        placeholder="Enter your name"
                        isInvalid={errors.fullName !== undefined}
                        errorMessage={errors.fullName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        isInvalid={errors.email !== undefined}
                        errorMessage={errors.email?.message}
                      />
                    )}
                  />
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isRequired
                        label="Status"
                        placeholder="Select your role"
                        selectedKeys={field.value ? [field.value] : []}
                        onSelectionChange={(keys) =>
                          field.onChange(Array.from(keys)[0])
                        }
                        isInvalid={errors.status !== undefined}
                        errorMessage={errors.status?.message}
                        className="text-black"
                      >
                        <SelectItem key="Mahasiswa">Mahasiswa</SelectItem>
                        <SelectItem key="Dosen">Dosen</SelectItem>
                      </Select>
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
                        placeholder="Enter your password"
                        type={visiblePassword.password ? "text" : "password"}
                        isInvalid={errors.password !== undefined}
                        errorMessage={errors.password?.message}
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => handleVisiblePassword("password")}
                          >
                            {visiblePassword.password ? (
                              <FaRegEye />
                            ) : (
                              <FaRegEyeSlash />
                            )}
                          </button>
                        }
                      />
                    )}
                  />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        label="Confirm Password"
                        placeholder="Enter your password"
                        type={
                          visiblePassword.confirmPassword ? "text" : "password"
                        }
                        isInvalid={errors.confirmPassword !== undefined}
                        errorMessage={errors.confirmPassword?.message}
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() =>
                              handleVisiblePassword("confirmPassword")
                            }
                          >
                            {visiblePassword.confirmPassword ? (
                              <FaRegEye />
                            ) : (
                              <FaRegEyeSlash />
                            )}
                          </button>
                        }
                      />
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <div className="flex flex-col items-center gap-4">
                        <label
                          htmlFor="profile-picture-upload"
                          className="cursor-pointer"
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt="Profile preview"
                              className="h-28 w-28 rounded-full object-cover"
                            />
                          ) : (
                            <FaCircle className="h-28 w-28 text-gray-300" />
                          )}
                        </label>
                        <input
                          id="profile-picture-upload"
                          type="file"
                          accept="image/*"
                          ref={ref}
                          onChange={(e) => onChange(e.target.files)}
                          className="hidden"
                        />
                        {errors.profilePicture && (
                          <p className="text-sm text-red-500">
                            {errors.profilePicture.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="jurusan"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        label="Program Study"
                        placeholder="Enter your program study"
                        isInvalid={errors.jurusan !== undefined}
                        errorMessage={errors.jurusan?.message}
                      />
                    )}
                  />
                  <Controller
                    name="universitas"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        label="University"
                        placeholder="Enter your university"
                        isInvalid={errors.universitas !== undefined}
                        errorMessage={errors.universitas?.message}
                      />
                    )}
                  />
                  <Controller
                    name="linkedinLink"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        label="LinkedIn Profile URL"
                        placeholder="https://www.linkedin.com/in/..."
                        isInvalid={!!errors.linkedinLink}
                        errorMessage={errors.linkedinLink?.message}
                      />
                    )}
                  />
                </>
              )}

              <div className="flex gap-4 pt-2">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="bordered"
                    className="w-full"
                    onPress={handleBack}
                  >
                    Back
                  </Button>
                )}

                {step === 1 ? (
                  <Button
                    className="w-full bg-[#CEB07E]"
                    type="button"
                    onPress={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button className="w-full bg-[#CEB07E]" type="submit">
                    {isPendingRegister ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      "Register"
                    )}
                  </Button>
                )}
              </div>

              <p className="w-full text-center text-base text-white">
                Already Have An Account?{" "}
                <Link href="/auth/login" className="text-[#CEAE78]">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </div>
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

export default Register;

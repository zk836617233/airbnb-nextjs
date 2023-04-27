"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      registerModal.onClose();
    } catch (error: any) {
      console.log(error);

      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="welcome to airbnb" subtitle="Create" center />
      <Input
        id="email"
        label="Email(邮箱)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name(姓名)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password(密码)"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="google注册"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="github注册"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="mt-4 text-neutral-500 text-center font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Alfready have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in(登录)
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Register(注册)"
      actionLabel="Continue 继续  "
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;

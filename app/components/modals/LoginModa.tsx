// "use client";

// import { signIn } from "next-auth/react";
// import axios from "axios";
// import { AiFillGithub } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useCallback, useState } from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import useLoginModal from "@/app/hooks/useLoginModal";
// import Modal from "./Modal";
// import Heading from "../Heading";
// import Input from "../inputs/Input";
// import { toast } from "react-hot-toast";
// import Button from "../Button";
// import { useRouter } from "next/navigation";

// const LoginModal = () => {
//   const router = useRouter();
//   const LoginModal = useLoginModal();
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       uesr: "",
//       password: "",
//     },
//   });
//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     setIsLoading(true);

//     try {
//       const value = await signIn("credentials", {
//         ...data,
//         redirect: false,
//       });

//       if (value?.ok) {
//         toast.success("logged in");
//         router.refresh();
//         LoginModal.onClose();
//       }

//       if (value?.error) {
//         toast.error(value?.error);
//       }

//       console.log(value, "value");
//     } catch (error) {
//       toast.error("error");
//     } finally {
//       setIsLoading(false);
//     }

//     // try {
//     //   await axios.post("/api/register", data);
//     //   LoginModal.onClose();
//     // } catch (error: any) {
//     //   console.log(error);

//     //   toast.error(error.message);
//     // } finally {
//     //   setIsLoading(false);
//     // }
//   };

//   const bodyContent = (
//     <div className="flex flex-col gap-4">
//       <Heading title="welcome back" subtitle="Login to your account!" center />
//       <Input
//         id="email"
//         label="Email"
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//       <Input
//         id="password"
//         label="Password"
//         type="password"
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//     </div>
//   );

//   const footerContent = (
//     <div className="flex flex-col gap-4 mt-3">
//       <hr />
//       <Button outline label="cont with google" icon={FcGoogle} />
//       <Button outline label="cont with github" icon={AiFillGithub} />
//       <div className="mt-4 text-neutral-500 text-center font-light">
//         <div className="flex flex-row justify-center items-center gap-2">
//           <div>Alfready have an account?</div>
//           <div
//             onClick={LoginModal.onClose}
//             className="text-neutral-800 cursor-pointer hover:underline"
//           >
//             Log in
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <Modal
//       title="Login （登录）"
//       actionLabel="Continue"
//       onClose={LoginModal.onClose}
//       onSubmit={handleSubmit(onSubmit)}
//       disabled={isLoading}
//       isOpen={LoginModal.isOpen}
//       body={bodyContent}
//       footer={footerContent}
//     />
//   );
// };

// export default LoginModal;

"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
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
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

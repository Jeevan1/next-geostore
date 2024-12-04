"use client";
import React, { useEffect, useRef } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/Button";
import FormInput from "@/components/form/FormInput";
import { FaUserLock } from "react-icons/fa";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const { user }: any = useAuthContext();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = React.useState(false);

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRef.current && !passwordRef.current) {
      enqueueSnackbar("Please enter your email and password.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    const { result, error } = await signIn(
      emailRef.current,
      passwordRef.current,
    );

    // if (error) {
    //   setLoading(false);
    //   // enqueueSnackbar(error, { variant: "error" });
    //   return console.log(error);
    // }
    if (result) {
      setLoading(false);
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      return router.push("/");
    }

    setLoading(false);
  };

  if (user && !loading) {
    return (
      <div className="flex min-h-screen items-center bg-slate-200 px-3 py-10">
        <div className="m-auto w-[500px] rounded-2xl bg-white p-5 py-7">
          <h1 className="mb-7 text-center text-2xl font-semibold">
            You are already logged in
          </h1>
          <Link href="/" className="flex items-center justify-center">
            <PrimaryButton>Go Home</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="flex min-h-screen items-center bg-slate-200 px-3 py-10 ">
        <div className="relative m-auto w-[500px] rounded-2xl bg-white p-5 py-7">
          <Link href="/">
            <Image
              src="/assets/img/logo/logo1.png"
              alt="logo"
              width={200}
              height={200}
              className="absolute mb-5 h-[30px] w-[100px]"
            />
          </Link>
          <div className="flex items-center justify-center ">
            <FaUserLock className="h-[100px] w-[100px] rounded-full border border-blue-300 p-4 text-5xl text-blue-400" />
          </div>
          <h1 className="mb-7 text-center text-2xl font-semibold">Log In</h1>
          <form action="" onSubmit={handleForm} className="flex flex-col gap-5">
            <div className="">
              <p className={"pb-2 text-md font-semibold text-secondary"}>
                Email Address
              </p>
              <FormInput
                name={"email"}
                type={"email"}
                label={"Email"}
                onChange={(e) => (emailRef.current = e.target.value)}
                value={emailRef.current}
                placeholder="Email Address"
                className="h-[50px] w-full max-w-full flex-1"
              />
            </div>
            <div>
              <p className={"pb-2 text-md font-semibold text-secondary"}>
                Profile Url
              </p>
              <FormInput
                name={"password"}
                type={"password"}
                label={"Password"}
                onChange={(e) => (passwordRef.current = e.target.value)}
                value={passwordRef.current}
                placeholder="Password"
                className="h-[50px] w-full max-w-full flex-1"
              />
            </div>
            <div className="mt-4 text-center">
              <PrimaryButton className="h-[45px] w-[130px]">
                {loading ? <ClipLoader size={22} color="blue" /> : "Log In"}
              </PrimaryButton>
            </div>
          </form>
          <div className="mt-5 flex items-center justify-center">
            <p className="text-sm font-medium text-secondary">
              Don't have an account?{" "}
              <Link
                className="border-b-2 border-primary text-primary"
                href="/signup"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;

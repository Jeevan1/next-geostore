"use client";
import React, { useContext, useRef } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { ProductContext } from "@/store/slice";
import { PrimaryButton } from "@/components/Button";
import FormInput from "@/components/form/FormInput";
import { FaUserLock } from "react-icons/fa";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

function Page() {
  const router = useRouter();
  const { user } = useAuthContext();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = React.useState(false);

  const handleForm = async (event) => {
    event.preventDefault();

    if (!emailRef.current && !passwordRef.current) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { result, error } = await signIn(
      emailRef.current,
      passwordRef.current,
    );

    if (error) {
      return console.log(error);
    }
    setLoading(false);

    return router.push("/");
  };

  const { products } = useContext(ProductContext);

  console.log(products);

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
        <div className="m-auto w-[500px] rounded-2xl bg-white p-5 py-7">
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
            <div className="mt-4">
              <PrimaryButton className="w-[130px]">Log In</PrimaryButton>
            </div>
          </form>
          <div className="mt-5 flex items-center justify-center">
            <p className="text-sm font-medium text-secondary">
              Don't have an account?{" "}
              <Link className="text-primary" href="/signup">
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

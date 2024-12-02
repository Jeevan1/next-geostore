"use client";
import React, { useRef } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import FormInput from "@/components/form/FormInput";
import { PrimaryButton } from "@/components/Button";
import { FaUserShield } from "react-icons/fa";
import Link from "next/link";

function Page() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const profileRef = useRef("");
  const userNameRef = useRef("");
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (
      !emailRef.current ||
      !passwordRef.current ||
      !userNameRef.current ||
      !profileRef.current ||
      !confirmPasswordRef.current
    ) {
      alert("Please enter all the fields.");
      return;
    }
    if (passwordRef.current !== confirmPasswordRef.current) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    let response = await signUp(
      emailRef.current,
      passwordRef.current,
      userNameRef.current,
      profileRef.current,
    );
    setLoading(false);

    if (response.error) {
      alert(response.error);
      return;
    }
    alert("Registration successful.");
    router.push("/");
  };
  return (
    <>
      <section className="flex min-h-screen items-center bg-slate-200 px-3 py-10 ">
        <div className="m-auto w-[500px] rounded-2xl bg-white p-5 py-7">
          <div className="flex items-center justify-center ">
            <FaUserShield className="h-[100px] w-[100px] rounded-full border border-blue-300 p-5 text-5xl text-blue-400" />
          </div>
          <h1 className="mb-7 text-center text-2xl font-semibold">Sign up</h1>
          <form
            action=""
            onSubmit={handleRegister}
            className="flex flex-col gap-3"
          >
            <div className="">
              <p className={"pb-2 text-md font-semibold text-secondary"}>
                Email Address
              </p>
              <FormInput
                name={"email"}
                type={"email"}
                label={"Email"}
                onChange={(e) => (emailRef.current = e.target.value)}
                placeholder="Email Address"
                className="h-[45px] w-full max-w-full flex-1"
              />
            </div>
            <div>
              <p className={"pb-2 text-md font-semibold text-secondary"}>
                Username
              </p>
              <FormInput
                name={"username"}
                type={"string"}
                label={"username"}
                onChange={(e) => (userNameRef.current = e.target.value)}
                placeholder="Username"
                className="h-[45px] w-full max-w-full flex-1"
              />
            </div>
            <div>
              <p className={"pb-2 text-md font-semibold text-secondary"}>
                Profile Url
              </p>
              <FormInput
                name={"profile"}
                type={"string"}
                label={"profile"}
                onChange={(e) => (profileRef.current = e.target.value)}
                placeholder="Profile Url"
                className="h-[45px] w-full max-w-full flex-1"
              />
            </div>
            <div className="flex gap-5">
              <div className="basis-1/2">
                <p className={"pb-2 text-md font-semibold text-secondary"}>
                  Password
                </p>
                <FormInput
                  name={"Password"}
                  type={"Password"}
                  label={"Password"}
                  onChange={(e) => (passwordRef.current = e.target.value)}
                  placeholder="Password"
                  className="h-[45px] w-full"
                />
              </div>
              <div className="basis-1/2">
                <p className={"pb-2 text-md font-semibold text-secondary"}>
                  Confirm Password
                </p>
                <FormInput
                  name={"ConfirmPassword"}
                  type={"password"}
                  label={"Confirm Password"}
                  onChange={(e) =>
                    (confirmPasswordRef.current = e.target.value)
                  }
                  placeholder="Confirm Password"
                  className="h-[45px] w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <PrimaryButton className="w-[130px]">Sign up</PrimaryButton>
            </div>
          </form>
          <div className="mt-5 flex items-center justify-center">
            <p className="text-sm font-medium text-secondary">
              Already have an account?{" "}
              <Link className="text-primary" href="/signin">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;

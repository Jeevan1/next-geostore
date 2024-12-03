"use client";
import React, { useRef } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import FormInput from "@/components/form/FormInput";
import { PrimaryButton } from "@/components/Button";
import { FaUserShield } from "react-icons/fa";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";

function Page() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const profileRef = useRef("");
  const userNameRef = useRef("");
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !userNameRef.current ||
      !profileRef.current ||
      !confirmPasswordRef.current
    ) {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      setLoading(false);
      return;
    }

    if (
      !profileRef.current.startsWith("https://") &&
      !profileRef.current.startsWith("http://")
    ) {
      enqueueSnackbar("Please enter a valid Profile URL", { variant: "error" });
      setLoading(false);
      return;
    }

    if (passwordRef.current.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      setLoading(false);
      return;
    }
    if (passwordRef.current !== confirmPasswordRef.current) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      setLoading(false);
      return;
    }

    let response = await signUp(
      emailRef.current,
      passwordRef.current,
      userNameRef.current,
      profileRef.current,
    );

    if (response?.error) {
      setLoading(false);
      return;
    }
    setLoading(false);
    enqueueSnackbar("Account created successfully", { variant: "success" });
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
            <div className="mt-4 text-center">
              <PrimaryButton className="h-[45px] w-[130px]">
                {loading ? <ClipLoader size={22} color="blue" /> : "Log In"}
              </PrimaryButton>
            </div>
          </form>
          <div className="mt-5 flex items-center justify-center">
            <p className="text-sm font-medium text-secondary">
              Already have an account?{" "}
              <Link
                className="border-b-2 border-primary text-primary"
                href="/signin"
              >
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

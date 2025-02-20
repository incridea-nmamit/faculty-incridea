import { signIn } from "next-auth/react";
import React from "react";

export default function PleaseLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-4 w-full max-w-md rounded-2xl  bg-red-900 p-10 text-center text-white shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">
          Faculties, please login with your organizational email
        </h1>
        <p className="text-base">to book your passes !</p>
        <button
        className={`rounded-3xl bg-white px-3 py-2 my-6 font-semibold text-red-700`}
        onClick={() => signIn("google")}
      >
        Sign In
      </button>
      </div>
    </div>
  );
}

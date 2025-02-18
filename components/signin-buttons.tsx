"use client";

import { signIn } from "next-auth/react";
import { ClientSafeProvider } from "next-auth/react";

interface SignInButtonsProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function SignInButtons({ providers }: SignInButtonsProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {Object.values(providers).map((provider) => {
        if (provider.name === "Credentials") return null;
        return (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

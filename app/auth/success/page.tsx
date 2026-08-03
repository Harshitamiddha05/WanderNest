"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const login = async () => {
      const token = searchParams.get("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        localStorage.setItem("token", token);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("userChanged"));

        router.replace("/dashboard");
      } catch (err) {
        console.error(err);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("userChanged"));

        router.replace("/login");
      }
    };

    login();
  }, [router, searchParams]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg font-semibold">Signing you in...</p>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
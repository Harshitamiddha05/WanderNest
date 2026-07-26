"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function AuthSuccess() {
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
        // Save token
        localStorage.setItem("token", token);

        // Fetch logged-in user
        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
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
      <p className="text-lg font-semibold">
        Signing you in...
      </p>
    </div>
  );
}
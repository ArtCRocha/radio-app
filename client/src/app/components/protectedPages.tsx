"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";

export default function ProtectedPages({ children }: { children: ReactNode }) {
  const { token, loading, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!token || (token && !loading && !user)) {
      router.push("/login");
    }
  }, [token, user, loading, router]);

  if (loading)
    return (
      <div className="w-full h-[100vh] bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );

  return <>{children}</>;
}

'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const role = session.user?.role;

    if (role === "Caregiver") {
      router.replace("/dashboard/caregiver");
    } else if (role === "Admin") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/client");
    }
  }, [session, status]);

  return <p className="p-6">Redirecting...</p>;
}
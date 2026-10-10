"use client";

import { useSession } from "next-auth/react";

export default function Home() {

  // getting data from session
  const { data: session, status } = useSession();

  console.log(session)

  // showing loaindg when loading
  if (status === "loading") {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        Loading...
      </main>
    );

  }

  return (

    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 text-white">

      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111113] p-10 text-center">

        <h1 className="text-3xl font-bold">
          Welcome, {session?.user?.name || "Guest"}!
        </h1>

        <p className="mt-4 text-zinc-400">
          Email: {session?.user?.email || "Not logged in"}
        </p>

      </div>

    </main>

  );

}
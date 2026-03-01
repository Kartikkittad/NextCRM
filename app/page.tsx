import Dashboard from "@/components/Dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <Dashboard />
      </main>
    </div>
  );
}

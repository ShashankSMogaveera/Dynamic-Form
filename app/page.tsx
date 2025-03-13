"use client";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-4">Theme Switcher</h1>
      <p className="mb-6 text-lg">Click a button to switch themes.</p>

      <ThemeSwitcher />

      <div className="flex gap-2 p-2">
      <button
        onClick={() => router.push("/form")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold transition-all mt-3"
      >
        Open Form
      </button>

      <button
        onClick={() => router.push("/home-details")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold transition-all mt-3"
      >
        Home details
      </button>

      <button
        onClick={() => router.push("/job-application")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold transition-all mt-3"
      >
        Job Application
      </button>

      <button
        onClick={() => router.push("/location-details")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold transition-all mt-3"
      >
        Location Details
      </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className="p-6 rounded-lg shadow-md border border-gray-300"
            style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
          >
            <h2 className="text-xl font-semibold mb-2">Card {num}</h2>
            <p>Switching the themes based on the button clicks</p>
            <button className="mt-4 px-4 py-2 rounded-md font-semibold">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}


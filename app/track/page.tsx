"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { TrackIntro } from "@/components/track/index";

export default function TrackPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (user) {
    console.log(user.fields.firstname);
  }
  if (!user) router.push("/");
  const userTrack: "fullstack" | "hr" | "pm" = "fullstack";

  return (
    <div className="min-h-screen bg-gray-50">
      <TrackIntro track={userTrack} />
    </div>
  );
}

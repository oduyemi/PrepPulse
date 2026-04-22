"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { TrackKey } from "@/data/tracks";
import { TrackIntro } from "@/components/track/index";

export default function TrackPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading session...</p>
      </div>
    );
  }

  if (!user) return null;

  const userTrack = user.fields.jobInterest as TrackKey;
  console.log(userTrack)
  // console.log({user.fields.skillLevel})

  return (
    <div className="min-h-screen bg-gray-50">
      <TrackIntro
        track={userTrack}
        level={user.fields.skillLevel}
      />
    </div>
  );
}
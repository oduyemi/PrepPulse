"use client";
import { TrackIntro } from "@/components/track/index";

export default function TrackPage() {
  const userTrack: "fullstack" | "hr" | "pm" = "fullstack";

  return (
    <div className="min-h-screen bg-gray-50">
      <TrackIntro track={userTrack} />
    </div>
  );
}

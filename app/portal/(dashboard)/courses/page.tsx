"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { OverviewCard } from "@/components/dashboard/analytics/OverviewCard";
import { ProgressChart } from "@/components/dashboard/analytics/ProgressChart";
import { WeakAreasCard } from "@/components/dashboard/analytics/WeakAreas";
import { CourseGrid } from "@/components/dashboard/courses/CourseGrid";

export default function CoursesWa() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

  }, [user]);

  return (
    <div className="space-y-6 mt-6">
      <CourseGrid />
    </div>
  );
}
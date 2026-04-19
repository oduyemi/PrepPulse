"use client";
import { AssessmentIntro } from "@/components/dashboard/assessment/Intro";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";


export default function AssessmentIntroPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (user) {
    console.log(user.fields.firstname);
  }
  if (!user) router.push("/");
  return (
    <div>
      <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
        <div className="mt-[-12]">
          <AssessmentIntro />
        </div>
      </main>
    </div>
  );
}

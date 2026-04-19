"use client";
import { useAuth } from "@/app/context/AuthContext";
import { AssessmentWa } from "@/components/dashboard/assessment/index";
import { useRouter } from "next/navigation";


export default function Assessments() {
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
          <AssessmentWa />
        </div>
      </main>
    </div>
  );
}

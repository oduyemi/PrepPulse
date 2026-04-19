import { NextStepCard } from "@/components/dashboard/home/NextSteps";
import { PerformanceCard } from "@/components/dashboard/home/Performance";
import { ReadinessCard } from "@/components/dashboard/home/Readiness";


export default function PortalHome() {
  return (
    <div>
      <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
        <ReadinessCard />
        <PerformanceCard />
        <NextStepCard />
      </main>
    </div>
  );
}

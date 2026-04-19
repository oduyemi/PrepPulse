import { Landing } from "@/components/home";
import { CTA } from "@/components/home/CTA";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { FeatureGrid } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Value } from "@/components/home/Value";


export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
        <Hero />
        <Process />
        {/* <FeatureGrid /> */}
        <Value />
      </main>
    </div>
  );
}

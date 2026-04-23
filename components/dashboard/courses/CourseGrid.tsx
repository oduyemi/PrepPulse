import { useAuth } from "@/app/context/AuthContext";
import { COURSES } from "@/data/courses";
import { CourseCard } from "./CourseCard";

export const CourseGrid = () => {
  const { user } = useAuth();

  const track = user?.fields?.jobInterest || "fullstack";
  const courses = COURSES[track] || [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Your Learning Path</h2>
        <p className="text-sm text-gray-500">
          Curated courses based on your selected track
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>

    </div>
  );
};
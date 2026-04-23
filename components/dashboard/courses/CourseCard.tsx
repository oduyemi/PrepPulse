"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Layers } from "lucide-react";


export const CourseCard = ({ course }: any) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <motion.div whileHover={{ y: -4 }}>
        <Card className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition cursor-pointer">
          <CardContent className="p-6 space-y-4">

            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpen className="h-5 w-5" />
            </div>

            {/* Title */}
            <div>
              <h3 className="font-semibold text-base group-hover:text-indigo-600 transition">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Layers className="h-3 w-3" />
                {course.modules.length} modules
              </p>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-400">
              Structured learning path
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};
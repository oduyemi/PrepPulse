"use client";
import { Card, CardContent } from "@/components/ui/card";

export const Section = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  return (
    <Card className="rounded-2xl border shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 space-y-3">
        <h3 className="font-semibold text-sm text-gray-900">
          {title}
        </h3>

        <ul className="space-y-2 text-sm text-gray-600">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-indigo-600">•</span>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
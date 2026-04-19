"use client";


export const DashboardPreview = () => {
    return (
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="rounded-2xl border bg-white shadow-xl p-6 text-left grid md:grid-cols-3 gap-4">
          <div className="col-span-2 space-y-3">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-20 bg-gradient-to-r from-pink-100 to-indigo-100 rounded-xl" />
            <div className="h-20 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }
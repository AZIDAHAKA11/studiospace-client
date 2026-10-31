"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StudioCard from "@/components/StudioCard";
import { Aperture } from "lucide-react";
import Link from "next/link";

function StudiosContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [studios, setStudios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        let url = "https://studiospace-server.onrender.com/api/studios";
        if (categoryParam) {
          url += `?category=${encodeURIComponent(categoryParam)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setStudios(data);
      } catch (error) {
        console.error("Failed to fetch studios", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudios();
  }, [categoryParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh] bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          {categoryParam ? `${categoryParam} Spaces` : "Explore Creative Spaces"}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Find the perfect studio for your next project. From photo studios to film stages, we have it all.
        </p>
        {categoryParam && (
          <Link href="/studios" className="inline-block mt-4 text-amber-600 dark:text-amber-500 hover:underline font-medium">
            Clear Filter
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Aperture className="w-12 h-12 text-amber-500 animate-spin mb-4" />
          <p className="text-zinc-500">Loading studios...</p>
        </div>
      ) : studios.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No Studios Found</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">There are no studios listed in this category yet.</p>
          <Link href="/add-studio" className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
            Add Your Studio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio: any) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreStudiosPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-amber-500">Loading...</div>}>
      <StudiosContent />
    </Suspense>
  );
}
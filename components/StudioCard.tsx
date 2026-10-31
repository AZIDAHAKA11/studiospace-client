import Link from "next/link";
import { MapPin, Star } from "lucide-react";

interface StudioCardProps {
  studio: {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    location: string;
    imageURL: string;
    rating?: number;
  };
}

export default function StudioCard({ studio }: StudioCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={studio.imageURL} 
          alt={studio.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-amber-600 dark:text-amber-500 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
          {studio.category}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-zinc-900 dark:text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          {studio.rating || "New"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1">{studio.title}</h3>
        
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{studio.location}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-500">${studio.hourlyRate}</span>
            <span className="text-zinc-500 dark:text-zinc-500 text-sm"> / hr</span>
          </div>
          <Link 
            href={`/studios/${studio._id}`}
            className="bg-zinc-100 hover:bg-amber-500 text-zinc-900 dark:bg-zinc-800 dark:text-white dark:hover:bg-amber-500 dark:hover:text-black font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
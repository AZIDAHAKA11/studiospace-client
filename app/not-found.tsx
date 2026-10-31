import Link from "next/link";
import { Aperture, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-950 text-center">
      <div className="relative mb-8">
        <Aperture className="w-32 h-32 text-zinc-300 dark:text-zinc-800 animate-[spin_10s_linear_infinite]" />
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-amber-500">
          404
        </h1>
      </div>
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Lights, Camera, Action... Not Found!</h2>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-8">
        The page you are looking for has been moved, deleted, or perhaps it was just a prop on our set.
      </p>
      <Link 
        href="/" 
        className="flex items-center gap-2 bg-amber-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Return to Home
      </Link>
    </div>
  );
}
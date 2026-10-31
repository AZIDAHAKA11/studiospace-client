"use client";

import { useAuth } from "@/context/AuthContext";
import { useSession } from "@/lib/auth-client";
import { Aperture, CalendarDays, List, PlusSquare, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user: expressUser, isLoading: expressLoading } = useAuth();
  const { data: baSession, isPending: baLoading } = useSession();

  const user = expressUser || baSession?.user;
  const isLoading = expressLoading || baLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 min-h-[80vh] bg-zinc-50 dark:bg-zinc-950">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Please login to access dashboard</h2>
        <Link href="/login" className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh] bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Manage your studios and bookings from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Studio Card */}
        <Link href="/add-studio" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 hover:shadow-lg transition-all group">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <PlusSquare className="w-6 h-6 text-amber-600 dark:text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Add New Studio</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">List a new creative space and start earning.</p>
        </Link>

        {/* My Listings Card */}
        <Link href="/my-listings" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 hover:shadow-lg transition-all group">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <List className="w-6 h-6 text-amber-600 dark:text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">My Studio Listings</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">View, update or delete your listed studios.</p>
        </Link>

        {/* My Bookings Card */}
        <Link href="/my-bookings" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 hover:shadow-lg transition-all group">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CalendarDays className="w-6 h-6 text-amber-600 dark:text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">My Bookings</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Track your upcoming studio sessions.</p>
        </Link>
      </div>
    </div>
  );
}
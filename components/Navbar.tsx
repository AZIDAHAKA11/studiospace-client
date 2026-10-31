"use client";

import Link from "next/link";
import { Aperture, Menu, X, LogOut, LayoutDashboard, PlusSquare, List, CalendarDays, User as UserIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import { useCurrentUser } from "@/components/useCurrentUser"; 
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  
  const { user, isLoading } = useCurrentUser();
  const { logout: expressLogout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await expressLogout(); 
      await authClient.signOut(); 
      
      toast.success("Logged out successfully");
      router.push("/login");
      setIsDropdownOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-2">
            <Aperture className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-wide">
              Studio<span className="text-amber-500">Space</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors font-medium">Home</Link>
            <Link href="/studios" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors font-medium">Explore Studios</Link>
            <Link href="/how-it-works" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors font-medium">How It Works</Link>
            <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors font-medium">About Us</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle /> 
            
            {isLoading ? (
              <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 focus:outline-none">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-amber-500" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-zinc-900 dark:text-white font-medium">{user.name.split(' ')[0]}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl py-2 flex flex-col">
                    <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 mb-2">
                      <p className="text-zinc-900 dark:text-white font-medium truncate">{user.name}</p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
                    <Link href="/add-studio" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3"><PlusSquare className="w-4 h-4" /> Add New Studio</Link>
                    <Link href="/my-listings" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3"><List className="w-4 h-4" /> My Studio Listings</Link>
                    <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3"><CalendarDays className="w-4 h-4" /> My Bookings</Link>
                    <div className="border-t border-zinc-200 dark:border-zinc-800 mt-2 pt-2">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3"><LogOut className="w-4 h-4" /> Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-zinc-900 dark:text-white hover:text-amber-500 transition-colors font-medium">Login</Link>
                <Link href="/register" className="bg-amber-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors">Register</Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-900 dark:text-white hover:text-amber-500">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <Link href="/" className="block py-2 text-zinc-600 dark:text-zinc-400 hover:text-amber-500">Home</Link>
          <Link href="/studios" className="block py-2 text-zinc-600 dark:text-zinc-400 hover:text-amber-500">Explore Studios</Link>
          <Link href="/about" className="block py-2 text-zinc-600 dark:text-zinc-400 hover:text-amber-500">About Us</Link>
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            {user ? (
               <button onClick={handleLogout} className="block w-full text-left py-2 text-red-500 font-medium">Logout</button>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-center text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 rounded-lg">Login</Link>
                <Link href="/register" className="block py-2 text-center bg-amber-500 text-black rounded-lg font-semibold">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
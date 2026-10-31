"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "@/components/useCurrentUser";
import { Aperture, Image as ImageIcon, DollarSign, MapPin, Users, ShieldCheck, Loader2 } from "lucide-react";

export default function AddStudioPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Photo Studio",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageURL: "",
    amenities: "",
    overview: "",
  });

 
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; 

    setIsLoading(true);

    const studioData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities: formData.amenities.split(",").map(item => item.trim()).filter(item => item !== ""),
    };

    try {
      
      const res = await fetch("https://studiospace-server-xyz.onrender.com/api/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(studioData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add studio");

      toast.success("Studio added successfully!");
      router.push("/my-listings"); // লিস্টিং পেজে রিডাইরেক্ট
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[80vh] bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="text-center mb-10">
        <Aperture className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">List Your Studio</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Share your creative space with the world.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl dark:shadow-2xl space-y-6">
        
        {/* Read Only User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-100 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Host Name (Read Only)</label>
            <input type="text" value={user?.name || ""} readOnly className="w-full bg-transparent text-zinc-900 dark:text-zinc-300 font-medium focus:outline-none mt-1" />
          </div>
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Host Email (Read Only)</label>
            <input type="text" value={user?.email || ""} readOnly className="w-full bg-transparent text-zinc-900 dark:text-zinc-300 font-medium focus:outline-none mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Studio Title</label>
            <input type="text" name="title" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g., Ultimate Photo Studio" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Category</label>
            <select name="category" onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors">
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Lounge">Podcast Lounge</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Art Workshop">Art Workshop</option>
            </select>
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Hourly Rate ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="number" name="hourlyRate" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="50" />
            </div>
          </div>

          {/* Security Deposit */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Security Deposit ($)</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="number" name="securityDeposit" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="100" />
            </div>
          </div>

          {/* Max Capacity */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Max Capacity</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="number" name="maxCapacity" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="10" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Location/Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="text" name="location" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Dhaka, Bangladesh" />
            </div>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Image URL</label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
            <input type="url" name="imageURL" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Amenities (Comma separated)</label>
          <input type="text" name="amenities" onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="WiFi, Lighting, AC, Green Screen" />
        </div>

        {/* Detailed Overview */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Detailed Overview</label>
          <textarea name="overview" required rows={4} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Describe your studio space..."></textarea>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
          {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : "Add Studio Listing"}
        </button>
      </form>
    </div>
  );
}
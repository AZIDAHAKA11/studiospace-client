"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "@/lib/auth-client";
import { Aperture, Image as ImageIcon, DollarSign, MapPin, Users, ShieldCheck } from "lucide-react";

export default function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user: expressUser, isLoading: expressLoading } = useAuth();
  const { data: baSession, isPending: baLoading } = useSession();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // Next.js 15 params unwrapping
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

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

  // ইউজারের ইমেইল বের করা হচ্ছে
  const currentUserEmail = expressUser?.email || baSession?.user?.email;

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(`https://studiospace-server.onrender.com/api/studios/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            category: data.category,
            hourlyRate: data.hourlyRate.toString(),
            securityDeposit: data.securityDeposit.toString(),
            maxCapacity: data.maxCapacity.toString(),
            location: data.location,
            imageURL: data.imageURL,
            amenities: data.amenities?.join(", ") || "",
            overview: data.overview,
          });
        }
      } catch (error) {
        toast.error("Failed to load studio data");
      } finally {
        setIsFetching(false);
      }
    };
    if (id) fetchStudio();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserEmail) return;

    setIsLoading(true);

    const studioData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities: formData.amenities.split(",").map(item => item.trim()).filter(item => item !== ""),
    };

    try {
      
      const url = `https://studiospace-server.onrender.com/api/studios/${id}?email=${currentUserEmail}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(studioData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update studio");

      toast.success("Studio updated successfully!");
      router.push("/my-listings");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching || expressLoading || baLoading) {
    return <div className="text-center py-20 text-amber-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[80vh] bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="text-center mb-10">
        <Aperture className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Update Studio</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Modify your creative space details.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl dark:shadow-2xl space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-100 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Host Name (Read Only)</label>
            <input type="text" value={expressUser?.name || baSession?.user?.name || ""} readOnly className="w-full bg-transparent text-zinc-900 dark:text-zinc-300 font-medium focus:outline-none mt-1" />
          </div>
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Host Email (Read Only)</label>
            <input type="text" value={currentUserEmail || ""} readOnly className="w-full bg-transparent text-zinc-900 dark:text-zinc-300 font-medium focus:outline-none mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Studio Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500">
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Lounge">Podcast Lounge</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Art Workshop">Art Workshop</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Hourly Rate ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="number" name="hourlyRate" required value={formData.hourlyRate} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Security Deposit ($)</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="number" name="securityDeposit" required value={formData.securityDeposit} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Max Capacity</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="number" name="maxCapacity" required value={formData.maxCapacity} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Location/Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Image URL</label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
            <input type="url" name="imageURL" required value={formData.imageURL} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Amenities (Comma separated)</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Detailed Overview</label>
          <textarea name="overview" required rows={4} value={formData.overview} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500"></textarea>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50">
          {isLoading ? "Updating..." : "Update Studio"}
        </button>
      </form>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Aperture, Edit, Trash2, MapPin, X } from "lucide-react";

export default function MyListingsPage() {
  const [studios, setStudios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null); // Modal State
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMyStudios = async () => {
    try {
      const res = await fetch("https://studiospace-server.onrender.com/api/studios/my-listings", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setStudios(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStudios();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`https://studiospace-server.onrender.com/api/studios/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Studio deleted successfully!");
      setStudios(studios.filter((s) => s._id !== deleteId));
      setDeleteId(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Aperture className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh] relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Studio Listings</h1>
        <Link href="/add-studio" className="bg-amber-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-amber-400 transition-colors">
          + Add New
        </Link>
      </div>

      {studios.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 rounded-2xl border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-2">No Studios Found</h2>
          <p className="text-zinc-400">You haven't added any studios yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <div key={studio._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
              <div className="h-48 relative">
                <img src={studio.imageURL} alt={studio.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-black/70 text-amber-500 text-xs px-2 py-1 rounded-full">{studio.category}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{studio.title}</h3>
                <p className="text-zinc-400 text-sm flex items-center gap-1 mb-4"><MapPin className="w-4 h-4"/> {studio.location}</p>
                <div className="mt-auto flex gap-3 pt-4 border-t border-zinc-800">
                  <Link href={`/studios/edit/${studio._id}`} className="flex-1 flex justify-center items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                    <Edit className="w-4 h-4" /> Update
                  </Link>
                  <button onClick={() => setDeleteId(studio._id)} className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2 rounded-lg transition-colors text-sm font-medium">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full relative">
            <button onClick={() => setDeleteId(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><X className="w-5 h-5"/></button>
            <h3 className="text-xl font-bold text-white mb-2">Delete Studio?</h3>
            <p className="text-zinc-400 mb-6 text-sm">Are you sure you want to delete this studio listing? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 font-medium">Cancel</button>
              <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium disabled:opacity-50">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
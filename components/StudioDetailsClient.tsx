"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Aperture, MapPin, Star, ShieldCheck, Users, CheckCircle, ArrowLeft, CalendarDays } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "./BookingModal"; 

export default function StudioDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [studio, setStudio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(`https://studiospace-server.onrender.com/api/studios/${id}`);
        if (res.ok) {
          const data = await res.json();
          setStudio(data);
        }
      } catch (error) {
        console.error("Failed to fetch studio", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchStudio();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Aperture className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Studio not found!</h2>
        <Link href="/studios" className="text-amber-500 hover:underline">Back to studios</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-400 hover:text-amber-500 mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side - Images & Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden h-[400px] border border-zinc-800">
            <img src={studio.imageURL} alt={studio.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{studio.title}</h1>
            <div className="flex items-center gap-4 text-zinc-400 mb-6">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {studio.location}</span>
              <span className="bg-zinc-800 text-amber-500 text-xs px-3 py-1 rounded-full">{studio.category}</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-3">About this space</h2>
            <p className="text-zinc-300 leading-relaxed mb-8">{studio.overview}</p>

            <h2 className="text-xl font-bold text-white mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-3">
              {studio.amenities?.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-amber-500" /> {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24 shadow-2xl">
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold text-amber-500">${studio.hourlyRate}</span>
              <span className="text-zinc-400 pb-1">/ hour</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-zinc-300 pb-3 border-b border-zinc-800">
                <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Security Deposit</span>
                <span className="font-semibold text-white">${studio.securityDeposit}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300 pb-3 border-b border-zinc-800">
                <span className="flex items-center gap-2"><Users className="w-5 h-5" /> Max Capacity</span>
                <span className="font-semibold text-white">{studio.maxCapacity} People</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-2"><Star className="w-5 h-5" /> Host</span>
                <span className="font-semibold text-white">{studio.ownerName}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                if (!user) {
                  router.push('/login');
                } else {
                  setIsModalOpen(true); 
                }
              }}
              className="w-full bg-amber-500 text-black font-bold py-3.5 rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
            >
              <CalendarDays className="w-5 h-5" /> Book Workspace Now
            </button>
            <p className="text-center text-xs text-zinc-500 mt-4">You won't be charged yet</p>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal 
          studio={studio} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            
            router.push('/my-bookings'); 
          }} 
        />
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { X, CalendarDays, Clock, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

interface BookingModalProps {
  studio: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingModal({ studio, onClose, onSuccess }: BookingModalProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return hours > 0 ? hours * studio.hourlyRate : 0;
  };

  const totalPrice = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPrice <= 0) {
      toast.error("End time must be after start time.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://studiospace-server.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          studioId: studio._id,
          date,
          startTime,
          endTime,
          totalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Booking Requested Successfully!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Book Studio</h2>
          <p className="text-zinc-400 mb-6">{studio.title}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Select Date</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                <input type="date" required min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-amber-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                  <input type="time" required value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-amber-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">End Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                  <input type="time" required value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-amber-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 mt-4">
              <div className="flex justify-between text-zinc-400 mb-2">
                <span>Hourly Rate</span>
                <span>${studio.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-zinc-800">
                <span>Total Price</span>
                <span className="text-amber-500">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-zinc-500 text-sm mt-1">
                <span>+ Security Deposit</span>
                <span>${studio.securityDeposit}</span>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 mt-4 flex justify-center items-center gap-2">
               <ShieldCheck className="w-5 h-5"/> {isLoading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
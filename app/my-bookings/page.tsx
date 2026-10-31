"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Aperture, CalendarDays, Clock, XCircle, MapPin, X } from "lucide-react";
import Link from "next/link";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://studiospace-server.onrender.com/api/bookings/my-bookings", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const confirmCancel = async () => {
    if (!cancelId) return;
    setIsCancelling(true);

    try {
      const res = await fetch(`https://studiospace-server.onrender.com/api/bookings/${cancelId}/cancel`, {
        method: "PATCH",
        credentials: "include",
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Booking cancelled successfully");
      fetchBookings(); 
      setCancelId(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20';
      default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-zinc-50 dark:bg-zinc-950">
        <Aperture className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-[80vh] bg-zinc-50 dark:bg-zinc-950 transition-colors relative">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <CalendarDays className="w-16 h-16 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No Bookings Yet</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">You haven't booked any studios yet.</p>
          <Link href="/studios" className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col shadow-sm dark:shadow-none">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{booking.date}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="mb-6 flex-1">
                <p className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-zinc-500" /> Total Price: <span className="text-amber-600 dark:text-amber-500 font-bold">${booking.totalPrice}</span>
                </p>
              </div>

              {booking.status === 'Pending' && (
                <button 
                  onClick={() => setCancelId(booking._id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/30 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-semibold"
                >
                  <XCircle className="w-5 h-5" /> Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Custom Cancel Modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-sm w-full relative">
            <button onClick={() => setCancelId(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              <X className="w-5 h-5"/>
            </button>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Cancel Booking?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 py-2 rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 font-medium transition-colors">
                Keep It
              </button>
              <button onClick={confirmCancel} disabled={isCancelling} className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium disabled:opacity-50 transition-colors">
                {isCancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Aperture, ArrowRight, ShieldCheck, Clock, CheckCircle, Search, CalendarDays, Camera, Mic, Music, Palette } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StudioCard from "@/components/StudioCard";

export default function Home() {
  const [featuredStudios, setFeaturedStudios] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("https://studiospace-server.onrender.com/api/studios?limit=6");
        if (res.ok) {
          const data = await res.json();
          setFeaturedStudios(data);
        }
      } catch (error) {
        console.error("Failed to fetch featured studios", error);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: "Photo Studio", display: "Photo Studios", icon: <Camera className="w-8 h-8 text-amber-500 mb-3" /> },
    { name: "Film Stage", display: "Film Stages", icon: <Aperture className="w-8 h-8 text-amber-500 mb-3" /> },
    { name: "Podcast Lounge", display: "Podcast Rooms", icon: <Mic className="w-8 h-8 text-amber-500 mb-3" /> },
    { name: "Music Suite", display: "Music Suites", icon: <Music className="w-8 h-8 text-amber-500 mb-3" /> },
    { name: "Art Workshop", display: "Art Workshops", icon: <Palette className="w-8 h-8 text-amber-500 mb-3" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      
      {/* 1. HERO SLIDER */}
      <section className="w-full relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-[70vh] w-full"
        >
          <SwiperSlide>
            <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070" alt="Studio" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="relative z-10 text-center px-4 max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Find Your Perfect <span className="text-amber-500">Creative Space</span></h1>
                <p className="text-xl text-zinc-200 mb-8">Book top-tier studios for your next big production, photoshoot, or podcast.</p>
                <Link href="/studios" className="bg-amber-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition-colors inline-block">Explore Studios</Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070" alt="Film Stage" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="relative z-10 text-center px-4 max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Bring Your Vision <span className="text-amber-500">To Life</span></h1>
                <p className="text-xl text-zinc-200 mb-8">Professional film stages and equipment ready for your next masterpiece.</p>
                <Link href="/add-studio" className="border border-amber-500 text-amber-500 font-bold px-8 py-3 rounded-lg hover:bg-amber-500 hover:text-black transition-colors inline-block">Host Your Space</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* 2. BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Browse by Category</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Find the perfect space based on your creative needs.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <Link href={`/studios?category=${encodeURIComponent(cat.name)}`} key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-amber-500/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all group shadow-sm dark:shadow-none">
              {cat.icon}
              <span className="text-zinc-900 dark:text-white font-semibold text-center group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">{cat.display}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED STUDIOS */}
      <section className="bg-zinc-100 dark:bg-zinc-950/50 py-20 w-full border-y border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Featured Studios</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Top-rated spaces handpicked for you.</p>
            </div>
            <Link href="/studios" className="text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {featuredStudios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStudios.map((studio: any) => (
                <StudioCard key={studio._id} studio={studio} />
              ))}
            </div>
          ) : (
            <div className="text-center text-zinc-500 py-10">Loading featured studios...</div>
          )}
        </div>
      </section>

      {/* 4. HOW BOOKING WORKS */}
      <section className="max-w-7xl mx-auto px-4 py-24 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">How Booking Works</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Get your studio booked in 4 simple steps.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="text-center bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
              <Search className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-zinc-900 dark:text-white font-bold mb-2">1. Discover Spaces</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Browse our curated list of premium studios.</p>
          </div>
          
          <div className="text-center bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-zinc-900 dark:text-white font-bold mb-2">2. Select Hours</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Choose your preferred date and time slot.</p>
          </div>
          
          <div className="text-center bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
              <CalendarDays className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-zinc-900 dark:text-white font-bold mb-2">3. Book Instantly</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Confirm your booking with our secure system.</p>
          </div>
          
          <div className="text-center bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
              <Aperture className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-zinc-900 dark:text-white font-bold mb-2">4. Create & Produce</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Show up and bring your creative vision to life.</p>
          </div>
        </div>
      </section>

      {/* 5. HOST GUARANTEE */}
      <section className="bg-zinc-100 dark:bg-zinc-900 py-20 w-full transition-colors">
        <div className="max-w-5xl mx-auto px-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-2xl flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Host Guarantee & Creator Support</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">We ensure your production goes smoothly. All hosts and creators are verified.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"><ShieldCheck className="w-5 h-5 text-amber-500" /> Liability protection up to $10,000</li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"><CheckCircle className="w-5 h-5 text-amber-500" /> Verified profiles & equipment safety</li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"><Clock className="w-5 h-5 text-amber-500" /> 24/7 host support hotline</li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <Aperture className="w-48 h-48 text-amber-500 opacity-20" />
          </div>
        </div>
      </section>

    </div>
  );
}
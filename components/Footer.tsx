import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 mt-auto pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Aperture className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                Studio<span className="text-amber-500">Space</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              The premier peer-to-peer marketplace connecting creators with high-end production spaces. Discover, book, and create.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-500 transition-colors">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/studios" className="hover:text-amber-500 transition-colors">Explore Studios</Link></li>
              <li><Link href="/how-it-works" className="hover:text-amber-500 transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/studios?category=Photo%20Studio" className="hover:text-amber-500 transition-colors">Photo Studios</Link></li>
              <li><Link href="/studios?category=Film%20Stage" className="hover:text-amber-500 transition-colors">Film Stages</Link></li>
              <li><Link href="/studios?category=Podcast%20Lounge" className="hover:text-amber-500 transition-colors">Podcast Lounges</Link></li>
              <li><Link href="/studios?category=Music%20Suite" className="hover:text-amber-500 transition-colors">Music Suites</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">Subscribe to our newsletter for the latest studio drops and updates.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button type="button" className="bg-amber-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <p>© 2026 StudioSpace. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-amber-500">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
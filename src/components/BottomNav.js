'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: 'grid_view', matchExact: true },
  { href: '/dashboard', label: 'Dashboard', icon: 'monitoring', matchExact: false },
  { href: '/recipes', label: 'Recipes', icon: 'restaurant_menu', matchExact: false },
  { href: '/food-guide', label: 'Food', icon: 'restaurant', matchExact: false },
  { href: '/tracker', label: 'Tracker', icon: 'ads_click', matchExact: false },
  { href: '/cholesterol', label: 'Heart', icon: 'favorite', matchExact: false },
  { href: '/challenges', label: 'Challenges', icon: 'emoji_events', matchExact: false },
  { href: '/community', label: 'Community', icon: 'group', matchExact: false },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-3 pb-6 pt-3 bg-white/90 backdrop-blur-2xl shadow-[0_-12px_40px_rgba(25,28,30,0.06)] rounded-t-[3rem]">
      {navItems.map(({ href, label, icon, matchExact }) => {
        const isActive = matchExact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex flex-col items-center justify-center rounded-full px-3 py-2 transition-all ${
              isActive
                ? 'bg-primary-container/10 text-primary-container'
                : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : {}}
            >
              {icon}
            </span>
            <span className="font-label text-[10px] font-semibold uppercase tracking-wider mt-1">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

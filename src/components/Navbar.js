'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/weekly-plan', label: 'Weekly Plan' },
  { href: '/food-guide', label: 'Food Guide' },
  { href: '/habits', label: 'Habits' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-[#f7f9fb]/80 backdrop-blur-xl shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-extrabold text-primary-container tracking-tighter font-headline">
          SugarCare
        </Link>
        <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors pb-1 ${
                pathname === href
                  ? 'text-primary-container border-b-2 border-primary-container'
                  : 'text-on-surface-variant hover:text-primary-container'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Notifications" className="hover:opacity-80 transition-opacity text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button aria-label="Account" className="hover:opacity-80 transition-opacity text-on-surface-variant">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

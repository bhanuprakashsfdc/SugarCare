'use client';

import Link from 'next/link';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-on-surface-variant hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-on-surface font-semibold" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

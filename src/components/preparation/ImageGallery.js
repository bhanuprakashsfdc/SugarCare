'use client';

import { memo } from 'react';

function ImageGallery({ images = [] }) {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src, index) => (
        <div
          key={index}
          className="aspect-square bg-surface-container-low rounded-lg overflow-hidden group cursor-pointer"
        >
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-30">image</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(ImageGallery);

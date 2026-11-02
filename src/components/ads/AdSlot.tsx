import React from 'react';

export interface AdSlotProps {
  slot: 'inContent' | 'footer' | 'sidebar';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, className = '' }) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // Height reservation to strictly prevent CLS
  const heights = {
    inContent: 'min-h-[120px] sm:min-h-[250px]',
    footer: 'min-h-[100px] sm:min-h-[160px]',
    sidebar: 'min-h-[250px] sm:min-h-[600px]',
  };

  // If in production and no adsense client yet, reserve space or render unobtrusive placeholder
  if (!isDev && !clientId) {
    return null;
  }

  return (
    <aside
      className={`my-8 w-full flex flex-col items-center justify-center ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[10px] uppercase tracking-wider text-[#5B5B66] mb-1.5 font-medium select-none">
        Advertisement
      </span>
      <div
        className={`w-full max-w-[728px] ${heights[slot]} bg-[#FAFAF9] border border-dashed border-[#E7E7E4] rounded-xl flex items-center justify-center p-4 text-xs text-[#5B5B66] select-none`}
      >
        {isDev ? (
          <span className="opacity-75">
            AdSense Slot ({slot}) — Reserved space (Prevents CLS)
          </span>
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={clientId}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </aside>
  );
};


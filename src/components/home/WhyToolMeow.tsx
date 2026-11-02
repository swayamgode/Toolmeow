import React from 'react';
import { ShieldCheck, Cpu, HardDrive, EyeOff } from 'lucide-react';

export const WhyToolMeow: React.FC = () => {
  const benefits = [
    {
      icon: EyeOff,
      title: 'Zero Server Uploads',
      description:
        'Standard tools send your confidential documents, photos, and financial numbers over external networks. ToolMeow processes everything within your local browser sandbox.',
    },
    {
      icon: Cpu,
      title: 'WebAssembly & Worker Speed',
      description:
        'Eliminating upload queues and server network latency means instant conversions and computations powered directly by your local device hardware.',
    },
    {
      icon: HardDrive,
      title: 'No Data Footprint',
      description:
        'Because files are read into local temporary memory blobs and immediately released, no records, cookies, or databases retain your personal information.',
    },
    {
      icon: ShieldCheck,
      title: 'Free Forever & Transparent',
      description:
        'No deceptive subscriptions, unexpected daily usage caps, watermarks, or credit card requirements. Transparent utilities built for everyone.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#F4F4F2]/60 border-y border-[#E7E7E4]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider block mb-2">
            The Client-Side Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight mb-4">
            Why Professionals Choose ToolMeow
          </h2>
          <p className="text-sm leading-relaxed text-[#5B5B66]">
            We redesigned traditional utility websites from the ground up: your files, passwords, calculations, and data never leave your device.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-white border border-[#E7E7E4] rounded-[24px] p-6 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B0B0F] mb-2">{b.title}</h3>
                  <p className="text-xs leading-relaxed text-[#5B5B66]">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


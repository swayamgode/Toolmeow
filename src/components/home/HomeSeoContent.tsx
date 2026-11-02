import React from 'react';

export const HomeSeoContent: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-[1000px] mx-auto text-[#5B5B66] text-sm leading-relaxed space-y-6">
      <div className="border-t border-[#E7E7E4] pt-12">
        <h2 className="text-2xl font-bold text-[#0B0B0F] mb-4">
          All-in-One Online Productivity Suite: Built for Speed, Privacy, and Precision
        </h2>
        <p>
          In today&apos;s fast-paced digital workplace, creators, engineers, accountants, students, and remote professionals constantly handle diverse file formats, complex tax computations, and data transformations. Traditional online tool portals frequently introduce friction: mandatory registration forms, paywalls after two uses, invasive file logging, and lengthy upload wait times over mobile networks.
        </p>
        <p>
          ToolMeow takes a fundamentally different engineering approach. By taking advantage of modern browser capabilities—including the WebAssembly runtime, HTML5 OffscreenCanvas, standard Web Workers, and the Web Cryptography API—all heavy processing takes place directly inside your client browser. Whether you are compressing high-resolution JPEG photos, merging multi-page PDF agreements, computing GST liability, or formatting JSON schemas, your confidential source data never touches remote servers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-xs bg-white p-6 rounded-2xl border border-[#E7E7E4]">
          <div>
            <h3 className="font-bold text-sm text-[#0B0B0F] mb-2">High-Performance Media & PDF Tools</h3>
            <p>
              Reduce image weights by up to 80% without losing visual clarity, resize images with multi-step bicubic downscaling for social media banners, generate vector-sharp QR codes with fault-tolerant error correction, and assemble JPG scans into standard A4 PDF documents with customizable borders.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0B0B0F] mb-2">Financial & Analytical Calculators</h3>
            <p>
              Calibrated with authentic Indian financial regulations and international math standards. Calculate home loan and vehicle EMIs with full monthly amortization tables, project mutual fund wealth creation through SIP formulas, and compute GST splits (CGST, SGST, IGST) with standard 2-decimal rounding.
            </p>
          </div>
        </div>
        <p>
          No logins. No subscriptions. No background server uploads. Simply instant, reliable, and privacy-respecting browser tools designed to help you get your daily tasks completed faster.
        </p>
      </div>
    </section>
  );
};


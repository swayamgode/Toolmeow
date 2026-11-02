import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-7xl font-extrabold text-[#4F46E5] mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-[#5B5B66] mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center px-6 py-3 rounded-full bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] transition-colors"
        >
          Browse All Tools
        </Link>
      </main>
      <Footer />
    </div>
  );
}

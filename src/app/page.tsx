import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          Something great is coming.
        </h1>
        <p className="text-lg sm:text-xl text-white/70">
          Drop your email and be the first to know when we launch.
        </p>
        <div className="flex justify-center pt-4">
          <WaitlistForm />
        </div>
        <p className="text-xs text-white/40 pt-12">
          Built with Next.js, Supabase, and Vercel.
        </p>
      </div>
    </main>
  );
}

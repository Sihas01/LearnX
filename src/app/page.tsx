import Link from "next/link";
import logo from '../../public/logo.png'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden  font-inter">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/imageOne.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

     <div className="z-10 w-full max-w-[650px] px-4 sm:px-6">
  <div className="rounded-[30px] sm:rounded-[40px] bg-white/65 p-8 sm:p-16 text-center backdrop-blur-xl border border-white/10 shadow-2xl">

          <div className="mb-8 sm:mb-12 flex items-center justify-center gap-6 sm:gap-10">
            <div className="flex flex-col items-center">
              <img src={logo.src} alt="" className="w-[200px] sm:w-[321px]" />
            </div>
          </div>

          <p className="mb-8 sm:mb-12 text-[15px] sm:text-[17px] leading-[1.6] text-[#718096] px-2 sm:px-4">
            LearnXPlus, we combine cutting edge AI technology with user focused design to deliver a smarter, more effective online learning experience.
          </p>

          <Link
            href="/login"
            className="inline-block w-full sm:w-[300px] rounded-2xl bg-[#8C2332] py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/20 hover:shadow-[#8B1D2D]/40"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}

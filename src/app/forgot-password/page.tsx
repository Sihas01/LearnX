import Link from "next/link";
import logo from '../../../public/logo.png';

export default function ForgotPasswordPage() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden font-inter p-4 bg-white">
       
            {/* Centered Glassmorphism Card */}
            <div className="z-10 w-full max-w-[500px]">
                <div className="rounded-[40px] bg-white/90 p-8 sm:p-12 text-center backdrop-blur-2xl border border-white/20 shadow-2xl">
                    <div className="mb-8 flex justify-center">
                        <img src={logo.src} alt="LearnX Logo" width={200} />
                    </div>

                    <h1 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1a1a]">Forgot Password?</h1>
                    <p className="mb-8 text-sm sm:text-base text-gray-500">
                        Enter your Gmail and we'll send you a link to reset your password.
                    </p>

                    <form className="space-y-6 text-left">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-500">Gmail</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#8C2332] py-4 text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/20 hover:shadow-[#8B1D2D]/40"
                        >
                            Send the verification link
                        </button>

                        <div className="text-center">
                            <Link href="/login" className="text-sm font-semibold text-[#8C2332] hover:underline">
                                Back to Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

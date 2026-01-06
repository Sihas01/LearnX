"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import logo from '../../../public/logo.png';
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="flex min-h-screen font-inter">
            <div className="flex w-full flex-col justify-between bg-white px-6 py-12 sm:px-12 sm:py-16 lg:w-1/2 xl:px-24">
                <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
                    <h1 className="mb-6 sm:mb-10 text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1a1a1a]">Sign in</h1>

                    <form className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-500">Student ID</label>
                            <input
                                type="text"
                                placeholder="RET12234"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                            />
                        </div>

                        <div className="relative">
                            <label className="mb-2 block text-sm font-medium text-gray-500">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <Link href="/forgot-password" className="text-sm font-medium text-[#D97706] hover:underline cursor-pointer">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full rounded-2xl bg-[#8B1D2D] py-4 text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/10"
                        >
                            Sign in
                        </button>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold text-gray-900 hover:underline">
                                Create now
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="mt-12 flex items-center justify-center">
                    <img src={logo.src} alt="" width={239} />
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 bg-[#FBCFE8]">
                <div className="h-full w-full" style={{
                    backgroundImage: "url('/Hero_image_new_2.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                }}>

                </div>
            </div>
        </main>
    );
}

"use client";

import Link from "next/link";
import logo from '../../../public/logo.png';
import { useState } from "react";
import Swal from "sweetalert2";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter your email',
                confirmButtonColor: '#8B1D2D'
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent',
                    text: 'If the email exists, you will receive a reset link shortly.',
                    confirmButtonColor: '#8B1D2D'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Request Failed',
                    text: data.detail || "Something went wrong",
                    confirmButtonColor: '#8B1D2D'
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Connection Error',
                text: 'Could not connect to the server',
                confirmButtonColor: '#8B1D2D'
            });
        }
    };

    return (
        <main className="flex min-h-screen font-inter">
            <div className="flex w-full flex-col justify-between bg-white px-6 py-12 sm:px-12 sm:py-16 lg:w-1/2 xl:px-24">
                <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
                    <h1 className="mb-2 text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1a1a1a]">Forgot Password</h1>
                    <p className="mb-8 text-gray-500">Enter your email and we'll send you a link to reset your password.</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-500">Email Address</label>
                            <input
                                type="email"
                                placeholder="john.doe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full rounded-2xl bg-[#8B1D2D] py-4 text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/10"
                        >
                            Send Reset Link
                        </button>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Remember your password?{" "}
                            <Link href="/login" className="font-semibold text-gray-900 hover:underline">
                                Back to Login
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

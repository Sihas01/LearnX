"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import logo from "../../../public/logo.png";
import { Mail } from "lucide-react";

function VerifyNowContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const [loading, setLoading] = useState(false);

    const handleResend = async () => {
        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Email not found. Please try registering again.",
                confirmButtonColor: "#8B1D2D",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resend-verification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Link Sent",
                    text: "A new verification link has been sent to your email.",
                    confirmButtonColor: "#8B1D2D",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: data.detail || "Failed to resend link.",
                    confirmButtonColor: "#8B1D2D",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Could not connect to the server.",
                confirmButtonColor: "#8B1D2D",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center max-w-md mx-auto w-full text-center text-red">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#8B1D2D]/10">
                <Mail className="h-10 w-10 text-[#8B1D2D]" />
            </div>

            <h1 className="mb-4 text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1a1a1a]">
                Verify Email
            </h1>

            <p className="mb-8 text-gray-600">
                Your account is not verified yet. Please check your inbox for the verification link sent to <span className="font-semibold text-gray-900">{email}</span>.
            </p>

            <button
                onClick={handleResend}
                disabled={loading}
                className="mb-4 w-full rounded-2xl bg-[#8B1D2D] py-4 text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/10 disabled:opacity-50"
            >
                {loading ? "Sending..." : "Resend Verification Link"}
            </button>

            <Link
                href="/login"
                className="text-sm font-semibold text-gray-500 hover:text-gray-900"
            >
                Back to Sign In
            </Link>
        </div>
    );
}

export default function VerifyNowPage() {
    return (
        <main className="flex min-h-screen font-inter">
            <div className="flex w-full flex-col justify-between bg-white px-6 py-12 sm:px-12 sm:py-16 lg:w-1/2 xl:px-24">
                <div className="flex flex-grow items-center justify-center">
                    <Suspense fallback={<div>Loading...</div>}>
                        <VerifyNowContent />
                    </Suspense>
                </div>

                <div className="mt-12 flex items-center justify-center">
                    <img src={logo.src} alt="LearnX Logo" width={239} />
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 bg-[#FBCFE8]">
                <div className="h-full w-full" style={{
                    backgroundImage: "url('/Hero_image_new_3.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                }}>
                </div>
            </div>
        </main>
    );
}

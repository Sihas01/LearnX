"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import logo from "../../../public/logo.png";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verify = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setStatus("error");
                setMessage("Invalid verification link.");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setStatus("success");
                    setMessage("Your email has been successfully verified! You can now sign in.");
                    Swal.fire({
                        icon: "success",
                        title: "Verified!",
                        text: "Your email has been verified. You can now sign in.",
                        confirmButtonColor: "#8B1D2D",
                    });
                } else {
                    setStatus("error");
                    setMessage(data.detail || "Verification failed. The link might be expired.");
                }
            } catch (err) {
                setStatus("error");
                setMessage("Could not connect to the server.");
            }
        };

        verify();
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
            <h1 className="mb-6 text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1a1a1a]">
                {status === "verifying" ? "Verifying..." : status === "success" ? "Verified!" : "Error"}
            </h1>

            <p className="mb-8 text-gray-600 text-lg">
                {message}
            </p>

            {status === "success" && (
                <Link
                    href="/login"
                    className="w-full rounded-2xl bg-[#8B1D2D] py-4 text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/10 block"
                >
                    Go to Sign In
                </Link>
            )}

            {status === "error" && (
                <Link
                    href="/register"
                    className="w-full rounded-2xl border-2 border-[#8B1D2D] py-4 text-lg font-semibold text-[#8B1D2D] transition-all hover:bg-gray-50 active:scale-[0.98] block"
                >
                    Back to Register
                </Link>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <main className="flex min-h-screen font-inter">
            <div className="flex w-full flex-col justify-between bg-white px-6 py-12 sm:px-12 sm:py-16 lg:w-1/2 xl:px-24">
                <div className="flex flex-grow items-center justify-center">
                    <Suspense fallback={<div>Loading...</div>}>
                        <VerifyEmailContent />
                    </Suspense>
                </div>

                <div className="mt-12 flex items-center justify-center">
                    <img src={logo.src} alt="LearnX Logo" width={239} />
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 bg-[#FBCFE8]">
                <div className="h-full w-full" style={{
                    backgroundImage: "url('/Hero_image_new_2.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                }}>
                </div>
            </div>
        </main>
    );
}

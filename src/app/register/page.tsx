"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import logo from '../../../public/logo.png';
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const getPasswordStrength = (pwd: string) => {
        if (pwd.length === 0) return { label: "", color: "bg-gray-200", width: "w-0", score: 0 };
        if (pwd.length < 8) return { label: "Too Short", color: "bg-red-400", width: "w-1/4", score: 1 };

        let score = 1;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score <= 2) return { label: "Not Good", color: "bg-orange-400", width: "w-2/4", score: 2 };
        if (score === 3) return { label: "Good", color: "bg-yellow-400", width: "w-3/4", score: 3 };
        return { label: "Great", color: "bg-green-500", width: "w-full", score: 4 };
    };

    const strength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !studentId || !password || !confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all fields',
                confirmButtonColor: '#8B1D2D'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a valid email address',
                confirmButtonColor: '#8B1D2D'
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Passwords do not match',
                confirmButtonColor: '#8B1D2D'
            });
            return;
        }

        if (strength.score < 4) {
            Swal.fire({
                icon: 'error',
                title: 'Weak Password',
                text: 'Password must be at least 8 characters and include a capital letter, a number, and a special character.',
                confirmButtonColor: '#8B1D2D'
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, studentId, password }),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'A verification link has been sent to your email. Please verify your account before signing in.',
                    confirmButtonColor: '#8B1D2D'
                }).then(() => {
                    router.push("/login");
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: data.detail || "Registration failed",
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
            <div className="hidden lg:block lg:w-1/2 bg-[#FBCFE8]">
                <div className="h-full w-full" style={{
                    backgroundImage: "url('/Hero_image_new_3.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                }}>

                </div>
            </div>

            <div className="flex w-full flex-col justify-between bg-white px-6 py-12 sm:px-12 sm:py-16 lg:w-1/2 xl:px-24">
                <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
                    <h1 className="mb-6 sm:mb-10 text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1a1a1a]">Create Account</h1>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-500">First Name</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-500">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-500">Username (Email)</label>
                            <input
                                type="email"
                                placeholder="john.doe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-500">Student ID</label>
                            <input
                                type="text"
                                placeholder="RET12234"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                            />
                        </div>

                        <div className="relative">
                            <label className="mb-2 block text-sm font-medium text-gray-500">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            {password && (
                                <div className="mt-2 text-xs">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-500">Password strength:</span>
                                        <span className={`font-semibold ${strength.score <= 1 ? "text-red-500" : strength.score === 2 ? "text-orange-500" : strength.score === 3 ? "text-yellow-600" : "text-green-600"}`}>
                                            {strength.label}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}></div>
                                    </div>
                                    <p className="mt-1 text-[10px] text-gray-400">
                                        Min 8 chars, 1 uppercase, 1 number, 1 special character
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <label className="mb-2 block text-sm font-medium text-gray-500">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="************"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 outline-none transition-all focus:border-[#8B1D2D]/50 focus:ring-4 focus:ring-[#8B1D2D]/5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-2xl bg-[#8B1D2D] py-4 text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/10"
                        >
                            Create Account
                        </button>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-gray-900 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="mt-12 flex items-center justify-center">
                    <img src={logo.src} alt="" width={239} />
                </div>
            </div>
        </main>
    );
}

"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import logo from '../../../public/logo.png';
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Mail } from "lucide-react"; // Import a Google-like icon if needed or just use text

const RegisterContent = () => {
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

        const emailRegex = /^[^\s@]+@(gmail\.com|wpu\.ac\.pg)$/;

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a valid email address (gmail.com or wpu.ac.pg only)',
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

    const handleGoogleLoginSuccess = async (tokenResponse: any, collectedStudentId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: tokenResponse.access_token,
                    studentId: collectedStudentId
                }),
            });
            const data = await response.json();
            if (response.ok) {
                if (data.is_new_user) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Register successfully',
                        text: `Welcome, ${data.user.firstName}! Your account has been created successfully.`,
                        confirmButtonColor: '#8B1D2D'
                    }).then(() => {
                        router.push("/login");
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: `Welcome back, ${data.user.firstName}!`,
                        confirmButtonColor: '#8B1D2D'
                    }).then(() => {
                        router.push("/login");
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Registration Failed',
                    text: data.detail || "Google registration failed",
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

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            const sid = sessionStorage.getItem('tempStudentId') || "";
            handleGoogleLoginSuccess(tokenResponse, sid);
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Google Registration Error',
                text: 'An error occurred during Google authentication',
                confirmButtonColor: '#8B1D2D'
            });
        }
    });

    const handleGoogleRegisterClick = async () => {
        const { value: sid } = await Swal.fire({
            title: 'Enter Student ID',
            input: 'text',
            inputLabel: 'Student ID',
            inputPlaceholder: 'e.g. RET12234',
            showCancelButton: true,
            confirmButtonColor: '#8B1D2D',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        });

        if (sid) {
            sessionStorage.setItem('tempStudentId', sid);
            googleLogin();
        }
    };

    return (
        <main className="flex min-h-screen lg:h-screen lg:overflow-hidden font-inter">
            <div className="hidden lg:block lg:w-1/2">
                <div className="h-full w-full" style={{
                    backgroundImage: "url('/Hero_image_new_3.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                }}>

                </div>
            </div>

            <div className="flex w-full flex-col justify-between bg-white px-6 py-12 sm:px-12 sm:py-16 lg:w-1/2 lg:h-full lg:overflow-y-auto xl:px-24">
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
                            <small className="text-muted text-gray-400">
                                Allowed domains: gmail.com, wpu.ac.pg
                            </small>
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
                            className="mt-6 w-full rounded-2xl bg-[#8B1D2D] py-4 text-lg font-semibold text-white transition-all hover:bg-[#a62337] active:scale-[0.98] shadow-lg shadow-[#8B1D2D]/10 cursor-pointer"
                        >
                            Create Account
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleGoogleRegisterClick}
                                className="flex items-center justify-center gap-2.5 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98] shadow-sm cursor-pointer"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 48 48">
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                </svg>
                                Sign in with Google
                            </button>
                        </div>

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
};

export default function RegisterPage() {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <RegisterContent />
        </GoogleOAuthProvider>
    );
}

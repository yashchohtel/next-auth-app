"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {

    // initilize userouter
    const router = useRouter();

    // state to store show hide paasword state
    const [showPassword, setShowPassword] = useState(false);

    // state to shwo loading error and success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // state to store the form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // function to handle form submission
    const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {

        // prevent default 
        e.preventDefault();

        // clear error and succes, set loading true
        setError("");
        setSuccess("");
        setLoading(true);

        try {

            // post request
            const response = await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            });

            setSuccess(response.data.message);
            console.log(response.data);
            router.push("/login");

        } catch (error) {

            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Signup failed");
            } else {
                setError("Something went wrong");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-10 text-white">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] p-8 shadow-2xl sm:p-10">
                <div className="mb-8 text-center">
                    {/* <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-2xl font-bold">
                        N
                    </div> */}
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create an account
                    </h1>
                    {/* <p className="mt-2 text-sm text-zinc-400">
                        Get started by creating your account
                    </p> */}
                </div>

                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                >
                    <span className="text-lg font-bold">G</span>
                    Continue with Google
                </button>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-zinc-500">OR CONTINUE WITH EMAIL</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <form
                    className="space-y-5"
                    onSubmit={handleSignup}
                >
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Full name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-[#09090b] px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-[#09090b] px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-[#09090b] px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* error message */}
                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}

                    {/* success message */}
                    {success && (
                        <p className="text-sm text-green-400">{success}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-violet-400 hover:text-violet-300"
                    >
                        Sign in
                    </Link>
                </p>

            </div>
        </main>
    );
}

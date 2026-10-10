"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    // initialize router
    const router = useRouter();

    // state to show or hide password
    const [showPassword, setShowPassword] = useState(false);

    // state to store loading and error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // state to store form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // function to handle form submission
    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {

        // prevent default form submission
        e.preventDefault();

        // clear error and set loading
        setError("");
        setLoading(true);

        try {

            // login using NextAuth credentials
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            // handle login failure
            if (!response || response.error) {
                setError("Invalid email or password");
                return;
            }

            // redirect after successful login
            router.push("/");

        } catch {

            setError("Something went wrong. Please try again.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-10 text-white">

            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] p-8 shadow-2xl sm:p-10">

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Sign in to your account
                    </p>

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

                    <span className="text-xs text-zinc-500">
                        OR CONTINUE WITH EMAIL
                    </span>

                    <div className="h-px flex-1 bg-white/10" />

                </div>

                <form
                    className="space-y-5"
                    onSubmit={handleLogin}
                >

                    <div>

                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-[#09090b] px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />

                    </div>

                    <div>

                        <div className="mb-2 flex items-center justify-between">

                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-xs text-violet-400 transition hover:text-violet-300"
                            >
                                Forgot password?
                            </button>

                        </div>

                        <div className="relative">

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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

                        <p className="text-sm text-red-400">
                            {error}
                        </p>

                    )}

                    {/* login button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">

                    Don&apos;t have an account?{" "}

                    <Link
                        href="/signup"
                        className="font-medium text-violet-400 hover:text-violet-300"
                    >
                        Create account
                    </Link>

                </p>

            </div>

        </main>

    );

}
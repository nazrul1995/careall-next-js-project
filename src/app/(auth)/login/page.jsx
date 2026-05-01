'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

import {
  MdVolunteerActivism,
  MdMail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdVerifiedUser,
  MdHealthAndSafety,
  MdFavorite,
  MdArrowForward
} from 'react-icons/md';

const LoginPage = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { status } = useSession();

  const [role, setRole] = useState('Client');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    Swal.fire({
      title: "Signing in...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
      callbackUrl
    });

    setLoading(false);

    if (result?.error) {

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: result.error,
        confirmButtonColor: "#06b6d4"
      });

    } else {

      Swal.fire({
        icon: "success",
        title: "Welcome Back 🎉",
        text: "Redirecting...",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        router.push(callbackUrl);
      });

    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Left Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary/10 items-center justify-center p-12">

        <div className="max-w-lg text-center">

          <div className="mb-8 inline-flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white">
              <MdVolunteerActivism className="text-3xl" />
            </div>

            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              Care.xyz
            </span>
          </div>

          <h1 className="text-4xl font-black mb-4 text-slate-900">
            Compassionate care starts here.
          </h1>

          <p className="text-lg text-slate-600">
            Join thousands of families and caregivers finding the perfect match.
          </p>

          <div className="mt-12 flex justify-center gap-8 text-4xl opacity-70">
            <MdVerifiedUser />
            <MdHealthAndSafety />
            <MdFavorite />
          </div>

        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20">

        <div className="w-full max-w-[480px]">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-slate-500 mb-8">
            Please sign in to continue
          </p>

          {/* Role selector */}
          <div className="mb-8">

            <p className="text-sm font-semibold mb-3 uppercase tracking-wider">
              I am a:
            </p>

            <div className="flex h-12 rounded-xl bg-slate-200 p-1">

              <label className="flex cursor-pointer grow items-center justify-center rounded-lg has-[:checked]:bg-white font-bold">

                Client

                <input
                  checked={role === 'Client'}
                  type="radio"
                  className="hidden"
                  onChange={() => setRole('Client')}
                />

              </label>

              <label className="flex cursor-pointer grow items-center justify-center rounded-lg has-[:checked]:bg-white font-bold">

                Caregiver

                <input
                  checked={role === 'Caregiver'}
                  type="radio"
                  className="hidden"
                  onChange={() => setRole('Caregiver')}
                />

              </label>

            </div>

          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div>

              <label className="text-sm font-medium ml-1">
                Email Address
              </label>

              <div className="relative mt-1">

                <MdMail className="absolute left-3 top-4 text-xl text-slate-400" />

                <input
                  className="w-full pl-10 pr-4 h-12 border rounded-xl"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="text-sm font-medium ml-1">
                Password
              </label>

              <div className="relative mt-1">

                <MdLock className="absolute left-3 top-4 text-xl text-slate-400" />

                <input
                  className="w-full pl-10 pr-10 h-12 border rounded-xl"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>

              </div>

            </div>

            {/* Submit */}
            <button
              className="w-full bg-primary text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
              <MdArrowForward />
            </button>

          </form>

          {/* Divider */}
          <div className="my-8 text-center text-sm text-slate-400">
            Or continue with
          </div>

          {/* Google Login */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full h-12 border rounded-xl flex items-center justify-center gap-3"
          >
            Sign in with Google
          </button>

          {/* Register */}
          <div className="mt-8 text-center text-sm">

            Don&apos;t have an account?

            <a
              href="/register"
              className="text-primary font-bold ml-1"
            >
              Create an account
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;
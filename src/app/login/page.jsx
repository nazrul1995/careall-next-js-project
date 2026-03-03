'use client';

import React, { useState } from 'react';
import { MdVolunteerActivism, MdMail, MdLock, MdVisibility, MdVisibilityOff, MdVerifiedUser, MdHealthAndSafety, MdFavorite, MdArrowForward, MdError } from 'react-icons/md';

const LoginPage = () => {
    const [role, setRole] = useState('Client');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Left Side: Illustration / Brand Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary/10 items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                </div>
                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-8 inline-flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <MdVolunteerActivism className="text-3xl" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Care.xyz</span>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-2xl bg-white mb-10 border border-slate-200">
                        <div
                            className="aspect-[4/3] w-full bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmBaGWeGHvYJocMswEvphDGE0FTSnBNw-8fs5nCWnd1rWg5rwCsETvl5KZQykPutNmQkUyAnTpxlGTAJQGRFqlkIzTsV5ihM8874cDecO0icO6uSkSszecQV_Md1s1QJRSXC9XkFlEcOSB9Ne4j8gktOyM_5RZWGEabAliLFhghPVIWsZ-JVUGu-GXUmO7SW2O9uwNHxMMiLiCSV1T4YkEey2EmHGS0ZqwOifyO93lXnJ0zpSAJTDV97LGW_sOtCwc3gx4v1NaMX4')" }}
                        ></div>
                    </div>
                    <h1 className="text-4xl font-black leading-tight mb-4 text-slate-900">Compassionate care starts here.</h1>
                    <p className="text-lg text-slate-600 leading-relaxed">Join thousands of families and dedicated caregivers finding the perfect match every day.</p>
                    <div className="mt-12 flex justify-center gap-8 grayscale opacity-60">
                        <MdVerifiedUser className="text-4xl" />
                        <MdHealthAndSafety className="text-4xl" />
                        <MdFavorite className="text-4xl" />
                    </div>
                </div>
            </div>
            {/* Right Side: Login Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-background-light dark:bg-background-dark">
                <div className="w-full max-w-[480px]">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <MdVolunteerActivism />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Care.xyz</span>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                        <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in to your account.</p>
                    </div>
                    {/* Role Selector */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">I am a:</p>
                        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800 p-1">
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
                                <span className="truncate">Client</span>
                                <input
                                    checked={role === 'Client'}
                                    className="invisible w-0"
                                    name="role-toggle"
                                    type="radio"
                                    value="Client"
                                    onChange={() => setRole('Client')}
                                />
                            </label>
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
                                <span className="truncate">Caregiver</span>
                                <input
                                    checked={role === 'Caregiver'}
                                    className="invisible w-0"
                                    name="role-toggle"
                                    type="radio"
                                    value="Caregiver"
                                    onChange={() => setRole('Caregiver')}
                                />
                            </label>
                        </div>
                    </div>
                    {/* Login Form */}
                    <form className="space-y-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <MdMail className="text-xl" />
                                </div>
                                <input
                                    className="block w-full pl-11 pr-4 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="name@example.com"
                                    required
                                    type="email"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <MdLock className="text-xl" />
                                </div>
                                <input
                                    className="block w-full pl-11 pr-12 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
                                </button>
                            </div>
                            <p className="text-xs text-red-500 hidden mt-1 flex items-center gap-1">
                                <MdError className="text-sm" />
                                Please enter a valid password.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-1">
                            <input className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-all" id="remember" type="checkbox" />
                            <label className="text-sm text-slate-600 dark:text-slate-400 select-none" htmlFor="remember">Remember this device</label>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group" type="submit">
                            <span>Sign In</span>
                            <MdArrowForward className="text-lg group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </form>
                    <div className="mt-8 relative text-center">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                        </div>
                        <span className="relative px-4 bg-background-light dark:bg-background-dark text-slate-500 text-sm">Or continue with</span>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-4">
                        <button className="flex items-center justify-center gap-3 w-full h-14 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-200 font-semibold shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                    <div className="mt-10 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            Don&apos;t have an account?
                            <a className="text-primary font-bold hover:underline" href="#">Create an account</a>
                        </p>
                    </div>
                    {/* Footer-style links */}
                    <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-center gap-6 text-xs text-slate-400 font-medium">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors" href="#">Help Center</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { MdVolunteerActivism, MdPerson, MdMail, MdLock, MdVisibility, MdVisibilityOff, MdVerifiedUser, MdHealthAndSafety, MdFavorite, MdArrowForward } from 'react-icons/md';
import Google from '@/components/google';

const RegisterPage = () => {
  const [role, setRole] = useState('Client');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      termsAgreed: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    // check terms agreement
    if (!data.termsAgreed) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms Required',
        text: 'Please agree to the Terms of Service and Privacy Policy',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // success
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: `Welcome ${data.name}! Your account has been created successfully.`,
        confirmButtonColor: '#3b82f6',
      }).then(() => {
        router.push('/login');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#3b82f6',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-soft items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/20 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <div className="mb-8 inline-flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white">
              <MdVolunteerActivism className="text-3xl" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Care.xyz</span>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white mb-10 border border-slate-200/50 p-2">
            <div
              className="aspect-[4/3] w-full bg-cover bg-center rounded-xl"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmBaGWeGHvYJocMswEvphDGE0FTSnBNw-8fs5nCWnd1rWg5rwCsETvl5KZQykPutNmQkUyAnTpxlGTAJQGRFqlkIzTsV5ihM8874cDecO0icO6uSkSszecQV_Md1s1QJRSXC9XkFlEcOSB9Ne4j8gktOyM_5RZWGEabAliLFhghPVIWsZ-JVUGu-GXUmO7SW2O9uwNHxMMiLiCSV1T4YkEey2EmHGS0ZqwOifyO93lXnJ0zpSAJTDV97LGW_sOtCwc3gx4v1NaMX4')" }}
            ></div>
          </div>
          <h1 className="text-4xl font-black leading-tight mb-4 text-slate-900">Find the perfect care for your loved ones.</h1>
          <p className="text-lg text-slate-600 leading-relaxed">Join our community of trusted caregivers and families dedicated to providing the highest quality of support.</p>
          <div className="mt-12 flex justify-center gap-8 grayscale opacity-40">
            <MdVerifiedUser className="text-4xl" />
            <MdHealthAndSafety className="text-4xl" />
            <MdFavorite className="text-4xl" />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-[480px]">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="bg-primary p-2 rounded-lg text-white">
              <MdVolunteerActivism />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Care.xyz</span>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Your Account</h2>
            <p className="text-slate-500 dark:text-slate-400">Join Care.xyz today and start your journey with us.</p>
          </div>
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">I want to join as a:</p>
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <MdPerson className="text-xl" />
                </div>
                <input
                  {...register('name', { required: 'Full name is required' })}
                  className={`block w-full pl-11 pr-4 h-14 bg-white dark:bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                  placeholder="Jane Doe"
                  type="text"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <MdMail className="text-xl" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`block w-full pl-11 pr-4 h-14 bg-white dark:bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                  placeholder="name@example.com"
                  type="email"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <MdLock className="text-xl" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className={`block w-full pl-11 pr-12 h-14 bg-white dark:bg-slate-800 border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                  placeholder="At least 8 characters"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
                </button>
                {errors.password && <span className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</span>}
              </div>
            </div>
            <div className="flex items-start gap-3 px-1 mt-4">
              <div className="flex items-center h-5">
                <input
                  {...register('termsAgreed')}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-all cursor-pointer"
                  id="terms"
                  type="checkbox"
                />
              </div>
              <label className="text-sm text-slate-600 dark:text-slate-400 select-none cursor-pointer" htmlFor="terms">
                I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>
              </label>
            </div>
            <button
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group mt-6"
              type="submit"
            >
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              {!isLoading && <MdArrowForward className="text-lg group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
          <div className="mt-8 relative text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <span className="relative px-4 bg-background-light dark:bg-background-dark text-slate-500 text-sm font-medium">Or join with</span>
          </div>
         <Google/>
          <div className="mt-10 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?
              <Link className="text-primary font-bold hover:underline" href="/login">Sign in</Link>
            </p>
          </div>
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

export default RegisterPage;
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdVolunteerActivism, MdPerson, MdMail, MdLock, MdVisibility, MdVisibilityOff, MdVerifiedUser, MdHealthAndSafety, MdFavorite, MdArrowForward } from 'react-icons/md';
import Google from '@/components/google';

const RegisterPage = () => {
  const [role, setRole] = useState('Client');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photo: null,
      photoURL: "",
      termsAgreed: false,
    },
  });

  const uploadedPhoto = watch("photo")?.[0];
  const photoURL = watch("photoURL");
  const onSubmit = async (data) => {

    if (!data.termsAgreed) {
      Swal.fire({
        icon: "warning",
        title: "Terms Required",
        text: "Please agree to the Terms of Service and Privacy Policy",
      });
      return;
    }

    if (!data.photoURL && (!data.photo || data.photo.length === 0)) {
      Swal.fire({
        icon: "warning",
        title: "Profile Photo Required",
        text: "Please upload a photo or provide an image URL",
      });
      return;
    }

    setIsLoading(true);

    try {

      let imageUrl = data.photoURL;

      // upload image if file exists
      if (data.photo && data.photo.length > 0) {

        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const imgData = await res.json();

        if (imgData.success) {
          imageUrl = imgData.data.display_url;
        }
      }

      // 🔥 Build payload
      let payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role,
        photo: imageUrl,
      };

      if (role === "Caregiver") {
        payload = {
          ...payload,
          location: data.location,
          experience: Number(data.experience),
          hourlyRate: Number(data.hourlyRate),
          credentials: data.credentials,
          description: data.description,
          specialties: data.specialties || [],
          rating: 0,
          jobs: 0,
        };
      }

      // ✅ DEBUG
      console.log("Final Payload:", payload);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: `Welcome ${data.name}!`,
      }).then(() => router.push("/login"));

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
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
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-checked:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
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
            <div className="flex flex-col gap-3">

              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Profile Photo
              </label>

              {/* FILE UPLOAD */}
              <input
                type="file"
                accept="image/*"
                disabled={!!photoURL}
                {...register("photo")}
                className="block w-full h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 disabled:opacity-50"
              />

              {/* URL INPUT */}
              <input
                type="text"
                placeholder="Or paste image URL (https://...)"
                disabled={!!uploadedPhoto}
                {...register("photoURL")}
                className="block w-full h-14 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white disabled:opacity-50"
              />

            </div>
            {role === "Caregiver" && (
              <div className="space-y-5 border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Caregiver Details
                </h3>

                {/* LOCATION */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    Location
                  </label>
                  <input
                    {...register("location", { required: role === "Caregiver" && "Location is required" })}
                    placeholder="e.g., Las Vegas, Nevada, USA"
                    className="h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
                </div>

                {/* EXPERIENCE */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    {...register("experience", { required: role === "Caregiver" && "Experience is required" })}
                    placeholder="e.g., 5"
                    className="h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                  {errors.experience && <span className="text-red-500 text-xs">{errors.experience.message}</span>}
                </div>

                {/* HOURLY RATE */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    {...register("hourlyRate", { required: role === "Caregiver" && "Hourly rate is required" })}
                    placeholder="e.g., 36"
                    className="h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                  {errors.hourlyRate && <span className="text-red-500 text-xs">{errors.hourlyRate.message}</span>}
                </div>

                {/* CREDENTIALS */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    Credentials
                  </label>
                  <input
                    {...register("credentials")}
                    placeholder="e.g., Pediatric Home Health Aide"
                    className="h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Write a short description..."
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                {/* SPECIALTIES CHECKBOX */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    Specialties
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Elderly Care",
                      "Babysitting",
                      "Special Needs",
                      "Pet Sitting",
                      "Housekeeping"
                    ].map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <input
                          type="checkbox"
                          value={item}
                          {...register("specialties")}
                          className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            )}

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
          <Google />
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
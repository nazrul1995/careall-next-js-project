'use client';

import BookingCard from '@/components/caregiver/BookingCard';
import Breadcrumb from '@/components/caregiver/Breadcrumb';
import ProfileHero from '@/components/caregiver/ProfileHero';
import TabsSection from '@/components/caregiver/TabsSection';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const SingleCareGiver = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/caregivers/${id}`, {
          cache: 'no-store',
        });

        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }
console.log(profile)
  if (!profile) {
    return (
      <div className="text-center py-20 text-red-500">
        Caregiver not found
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl w-full px-6 py-8">
      <Breadcrumb profile={profile} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          <ProfileHero profile={profile} />
          <TabsSection profile={profile} />
        </div>

        {/* Right */}
        <div className="lg:col-span-1">
          <BookingCard profile={profile} />
        </div>
      </div>
    </main>
  );
};

export default SingleCareGiver;
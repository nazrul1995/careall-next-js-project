import { getSingleCaretaker } from '@/actions/server/caretakers';
import React from 'react';
import Breadcrumb from '@/components/caregiver/Breadcrumb';
import ProfileHero from '@/components/caregiver/ProfileHero';
import TabsSection from '@/components/caregiver/TabsSection';
import BookingCard from '@/components/caregiver/BookingCard';

export const dynamic = 'force-dynamic'; // change as needed for rendering strategy

export async function generateMetadata({ params }) {
  const profile = await getSingleCaretaker(params.id);
  return {
    title: profile?.name ? `${profile.name} – Caregiver` : 'Caretaker Profile',
  };
}

const CaregiverProfile = async ({ params }) => {
  const { id } = await params;
  const profile = await getSingleCaretaker(id);

  if (!profile) {
    // optionally handle not-found
    return <p className="text-center">Profile not found.</p>;
  }

  return (
    <main className="mx-auto max-w-7xl w-full px-6 py-8">
      <Breadcrumb profile={profile} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          <ProfileHero profile={profile} />
          <TabsSection profile={profile} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-1">
          <BookingCard rate={profile?.rate || 0} />
        </div>
      </div>
    </main>
  );
}

export default CaregiverProfile;
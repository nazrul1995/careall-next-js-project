import React from 'react';

export default function CredentialsTab({ profile }) {
  // Placeholder for credentials (certifications, licenses, etc.)
  return (
    <section>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Credentials
      </h3>
      <p className="text-slate-600 dark:text-slate-400">
        {/* render credentials from profile if available */}
        {profile?.credentials || 'No credentials listed.'}
      </p>
    </section>
  );
}

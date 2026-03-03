// app/caretakers/page.tsx   or   components/CaretakerSearch.tsx
import { getCaretakers } from '@/actions/server/caretakers';
import LiveCaretakerSearch from '@/components/LiveCaretakerSearch';

const AllCareTakers = async ({ searchParams }) => {
  const params = await searchParams;
  const { results: rawCaretakers, total } = await getCaretakers(params || {});
  // convert any ObjectId values to primitive strings so the data can be
  // passed into a client component without serialization errors
  const caretakers = rawCaretakers.map(c => ({
    ...c,
    _id: c._id?.toString ? c._id.toString() : c._id,
  }));

  const { service, minExp, minRate, maxRate, search } = params || {};
  const selectedServices = Array.isArray(service) ? service : service ? [service] : [];
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* interactive search with live filtering */}
          <LiveCaretakerSearch
            initialCaretakers={caretakers}
            initialTotal={total}
            initialFilters={{
              service: selectedServices,
              minExp,
              minRate,
              maxRate,
              search,
              sort: params.sort || '',
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default AllCareTakers;
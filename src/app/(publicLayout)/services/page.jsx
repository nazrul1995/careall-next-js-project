import { getCaretakers } from '@/actions/server/caretakers';
import LiveCaretakerSearch from '@/components/LiveCaretakerSearch';

const AllCareTakers = async ({ searchParams }) => {
  const params = await searchParams;

  const { results: rawCaretakers = [], total = 0 } =
    await getCaretakers(params || {});

  const caretakers = rawCaretakers.map((c) => ({
    ...c,
    _id: c._id?.toString?.() || c._id,
  }));

  const selectedServices = Array.isArray(params?.service)
    ? params.service
    : params?.service
    ? [params.service]
    : [];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 py-30">
        <LiveCaretakerSearch
          initialCaretakers={caretakers}
          initialTotal={total}
          initialFilters={{
            service: selectedServices,
            minExp: params?.minExp || '',
            minRate: params?.minRate || '',
            maxRate: params?.maxRate || '',
            search: params?.search || '',
            sort: params?.sort || 'rating',
          }}
        />
      </div>
    </div>
  );
};

export default AllCareTakers;
'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { MdCheck, MdClose, MdAccessTime, MdCalendarToday, MdOutlinePayments } from 'react-icons/md';

const MyOrder = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            if (!user) return;
            try {
                const res = await fetch(`/api/bookings?email=${user.email}`);
                const data = await res.json();
                setJobs(data.bookings || []);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'accepted': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'rejected': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    if (loading) return <div className="p-8 text-center animate-pulse">Loading bookings...</div>;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Job Management</h2>
                <p className="text-slate-500 dark:text-slate-400">Manage your care requests and track schedules.</p>
            </div>

            {jobs.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
                    <p className="text-slate-500">No bookings found at this time.</p>
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 uppercase text-xs font-bold tracking-wider">
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Payment</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {jobs.map((job, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900 dark:text-white">{job.clientEmail}</div>
                                            <div className="text-xs text-slate-500 truncate max-w-[150px]">{job.notes}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <MdCalendarToday className="text-primary" />
                                                {new Date(job.checkInDate).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-slate-500 ml-6">{job.startTime} - {job.endTime} ({job.durationHours}h)</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 dark:text-white">${job.totalPrice}</div>
                                            <div className="text-[10px] uppercase font-bold text-slate-400">{job.paymentStatus}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                                                {job.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                                                    <MdCheck size={18} />
                                                </button>
                                                <button className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                                    <MdClose size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {jobs.map((job, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{job.clientEmail}</h3>
                                        <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(job.status)}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-primary">${job.totalPrice}</div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <MdCalendarToday className="text-primary" />
                                        <span>{new Date(job.checkInDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <MdAccessTime className="text-primary" />
                                        <span>{job.startTime} - {job.endTime} ({job.durationHours}h)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <MdOutlinePayments className="text-primary" />
                                        <span className="capitalize">{job.paymentStatus} Payment</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                                        <MdCheck /> Accept
                                    </button>
                                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyOrder;
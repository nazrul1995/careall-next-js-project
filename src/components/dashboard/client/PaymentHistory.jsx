'use client';

import React, { useEffect, useState } from 'react';
import { MdPayment, MdCheckCircle, MdDownload, MdFileDownload } from 'react-icons/md';

export default function PaymentHistory({ onRefresh }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaymentHistory();
  }, [onRefresh]);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/dashboard/payment-history');

      if (!response.ok) {
        throw new Error('Failed to fetch payment history');
      }

      const data = await response.json();
      setPayments(data.payments || []);
    } catch (err) {
      console.error('Error fetching payment history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = (payment) => {
    // Generate simple invoice (you can enhance this with a proper invoice generator)
    const invoice = `
CARE.XYZ - INVOICE

Invoice Date: ${new Date(payment.date).toLocaleDateString()}
Transaction ID: ${payment.stripePaymentIntentId}
Booking ID: ${payment.bookingId}

SERVICE DETAILS
===============
Caregiver: ${payment.caretakerName}
Service Type: ${payment.serviceType}
Date: ${new Date(payment.checkInDate).toLocaleDateString()}
Time: ${payment.startTime} - ${payment.endTime}
Duration: ${payment.durationHours} hours

BILLING SUMMARY
===============
Service Amount: $${(payment.amount - 5).toFixed(2)} (estimate)
Service Fee: $5.00 (estimate)
Total Amount: $${payment.amount}
Status: ${payment.status}

Thank you for using Care.xyz!
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(invoice));
    element.setAttribute('download', `invoice-${payment.bookingId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          Error loading payment history: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Payments</p>
          <p className="text-3xl font-bold text-green-900 dark:text-green-300 mt-2">${payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">{payments.length} transactions</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Average Payment</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-300 mt-2">
            ${payments.length > 0 ? (payments.reduce((sum, p) => sum + p.amount, 0) / payments.length).toFixed(2) : '0.00'}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Per transaction</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Total Bookings</p>
          <p className="text-3xl font-bold text-purple-900 dark:text-purple-300 mt-2">{payments.length}</p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Completed & paid</p>
        </div>
      </div>

      {/* Payment List */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Payment Transactions</h2>
        {payments.length > 0 ? (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.bookingId}
                className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-gray-200 dark:border-slate-600 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                      <MdCheckCircle className="text-2xl" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">{payment.caretakerName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{payment.serviceType}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(payment.date).toLocaleDateString()} • {new Date(payment.checkInDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {payment.startTime} - {payment.endTime} ({payment.durationHours}h)
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">${payment.amount}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleDownloadInvoice(payment)}
                        className="px-3 py-2 bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-500 transition flex items-center gap-1"
                      >
                        <MdDownload /> Invoice
                      </button>
                      <span className="px-3 py-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-xs font-semibold">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-700 rounded-lg p-12 text-center border border-gray-200 dark:border-slate-600">
            <MdPayment className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">No payments yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Complete a booking and make a payment to see your history
            </p>
          </div>
        )}
      </div>

      {/* Payment Method Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">💳 Payment Method</h3>
        <p className="text-sm text-blue-800 dark:text-blue-400">
          All payments are processed securely through Stripe. Your payment information is encrypted and never stored on our servers.
        </p>
      </div>
    </div>
  );
}

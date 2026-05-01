'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MdArrowBack, MdCheckCircle, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`);
      if (!response.ok) throw new Error('Failed to fetch booking');
      const data = await response.json();
      setBooking(data.booking);
    } catch (err) {
      Swal.fire('Error', 'Failed to load booking details', 'error');
      router.push('/dashboard/client');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePaymentIntent = async () => {
    try {
      setProcessing(true);

      // Create payment intent
      const response = await fetch('/api/bookings/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create payment');
      }

      const data = await response.json();
      const { clientSecret } = data;

      // Show payment form (in production, use @stripe/react-stripe-js)
      // For now, show a mock payment interface
      showPaymentModal(clientSecret, data);
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      setProcessing(false);
    }
  };

  const showPaymentModal = (clientSecret, paymentData) => {
    Swal.fire({
      title: 'Complete Payment',
      html: `
        <div class="text-left space-y-4">
          <div class="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
            <p class="font-semibold mb-2">Payment Details</p>
            <p>Amount: <strong>$${booking.totalPrice}</strong></p>
            <p>Service: <strong>${booking.serviceType}</strong></p>
            <p>Caregiver: <strong>${booking.caretakerName}</strong></p>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-semibold">Card Details (Test Mode)</p>
            <input type="text" placeholder="4242 4242 4242 4242" class="w-full px-3 py-2 border rounded text-sm" maxlength="19" />
            <div class="grid grid-cols-2 gap-2">
              <input type="text" placeholder="MM/YY" class="px-3 py-2 border rounded text-sm" />
              <input type="text" placeholder="CVC" class="px-3 py-2 border rounded text-sm" />
            </div>
            <input type="email" placeholder="Email" class="w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div class="bg-yellow-50 rounded-lg p-3 text-xs text-yellow-800">
            <p class="font-semibold">⚠️ Test Mode</p>
            <p>Use card: 4242 4242 4242 4242</p>
            <p>Any future date and any CVC</p>
          </div>
        </div>
      `,
      icon: undefined,
      showCancelButton: true,
      confirmButtonText: 'Pay Now',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        // Set focus on first input
        const inputs = document.querySelectorAll('input');
        if (inputs.length > 0) inputs[0].focus();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        simulatePayment(booking._id);
      }
    });
  };

  const simulatePayment = async (bookingId) => {
    try {
      setProcessing(true);

      // Simulate Stripe payment (in production, this would be done on the frontend)
      // For now, we'll show a success message
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Swal.fire({
        title: 'Payment Successful!',
        text: 'Your booking has been confirmed. The caregiver will review your request shortly.',
        icon: 'success',
        confirmButtonText: 'View Booking',
      }).then(() => {
        router.push('/dashboard/client');
      });
    } catch (err) {
      Swal.fire('Payment Failed', err.message, 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Booking not found</p>
          <button
            onClick={() => router.push('/dashboard/client')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => router.push('/dashboard/client')}
          className="flex items-center gap-2 text-primary mb-6 hover:underline"
        >
          <MdArrowBack /> Back to Dashboard
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 space-y-6">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Complete Payment</h1>

              {/* Booking Summary */}
              <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 space-y-3">
                <h2 className="font-bold text-slate-900 dark:text-white mb-4">Booking Summary</h2>

                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-600">
                  <span className="text-gray-600 dark:text-gray-400">Caregiver</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{booking.caretakerName}</span>
                </div>

                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-600">
                  <span className="text-gray-600 dark:text-gray-400">Service</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{booking.serviceType}</span>
                </div>

                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-600">
                  <span className="text-gray-600 dark:text-gray-400">Date</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-600">
                  <span className="text-gray-600 dark:text-gray-400">Time</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>

                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-600">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{booking.durationHours} hours</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${(booking.totalPrice - booking.serviceCharge).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${booking.serviceCharge.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-3 border-t-2 border-primary">
                  <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">${booking.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">Payment Method</h3>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-primary rounded-lg cursor-pointer bg-primary/10">
                    <input type="radio" name="method" checked={paymentMethod === 'card'} readOnly className="w-4 h-4" />
                    <span className="font-semibold text-slate-900 dark:text-white">Credit / Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer opacity-50">
                    <input type="radio" name="method" disabled className="w-4 h-4" />
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Coming Soon: Apple Pay</span>
                  </label>
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-800 dark:text-green-400">
                  ✓ All payments are securely processed through Stripe. Your payment information is encrypted and never stored on our servers.
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handleCreatePaymentIntent}
                disabled={processing}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : `Pay $${booking.totalPrice.toFixed(2)}`}
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                By clicking Pay, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          {/* Right Sidebar - Booking Details */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 sticky top-8 space-y-4">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Caregiver</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{booking.caretakerName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service Type</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{booking.serviceType}</p>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${(booking.totalPrice - booking.serviceCharge).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white">${booking.serviceCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-primary">${booking.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs text-blue-800 dark:text-blue-400">
                  💡 After payment, your booking will be confirmed and the caregiver will review your request.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

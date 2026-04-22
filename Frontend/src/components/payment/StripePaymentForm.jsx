import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaLock, FaCreditCard } from 'react-icons/fa';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#1d1733',
      fontSize: '16px',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#8c84a1',
      },
    },
    invalid: {
      color: '#ff4d4f',
    },
  },
};

function StripePaymentForm({ amount = 0, currency = 'USD', onSuccess, onError, disabled }) {
  const stripe = useStripe();
  const elements = useElements();
  const [billingName, setBillingName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (disabled) {
      setStatusMessage('Please complete the shipping details first.');
      return;
    }

    if (!stripe || !elements) {
      setStatusMessage('Stripe is still loading. Please wait.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setStatusMessage('Card input is unavailable.');
      return;
    }

    if (!billingName.trim()) {
      setStatusMessage('Name on card is required.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Processing payment...');

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: billingName,
      },
    });

    setIsSubmitting(false);

    if (result.error) {
      const errorMessage = result.error.message || 'Payment failed. Please try again.';
      setStatusMessage(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      return;
    }

    setStatusMessage('Payment method created successfully. Order confirmed!');
    if (onSuccess) {
      onSuccess(result.paymentMethod);
    }
  };

  return (
    <div className="bg-brand p-8 rounded-xl shadow-lg border border-brand-muted">
      <div className="flex items-center gap-3 mb-6">
        <FaCreditCard className="text-brand-primary w-5 h-5" />
        <div>
          <h2 className="text-2xl font-semibold text-brand">Stripe Payment</h2>
          <p className="text-sm text-brand-muted">Pay securely with your card using Stripe.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-brand-muted mb-2">Name on Card</label>
          <input
            type="text"
            value={billingName}
            onChange={(e) => setBillingName(e.target.value)}
            className="w-full p-3 border border-brand-muted rounded-lg bg-brand-dark text-brand placeholder:text-brand-muted focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-muted mb-2">Card Details</label>
          <div className="p-4 border border-brand-muted rounded-xl bg-brand-dark">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="rounded-xl border border-brand-muted bg-brand-dark p-4 text-brand-muted">
          <p className="text-sm">Amount to charge:</p>
          <p className="text-lg font-semibold text-brand">{currency.toUpperCase()} {Number(amount).toFixed(2)}</p>
        </div>

        {statusMessage && <p className="text-sm text-brand-info">{statusMessage}</p>}

        <button
          type="submit"
          disabled={!stripe || isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-brand-highlight font-semibold transition hover:bg-brand"
        >
          <FaLock />
          {isSubmitting ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

export default StripePaymentForm;

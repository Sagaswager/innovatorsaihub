/* ------------------------------------------------------------------ *
 * YouPI checkout — created 2026-11-17.
 *
 * "My Plan" hands the order to the payment gateway instead of showing a
 * static QR. The gateway prices the order from its own catalogue: the amount
 * we send is only honoured if it is a real price for that plan, so a tampered
 * browser cannot buy a ₹27,000 plan for ₹1.
 * ------------------------------------------------------------------ */

export const CHECKOUT_ENDPOINT = 'https://pay-hook.innovatorsaihub.com/plan/checkout';

export type CheckoutResult =
  | { ok: true; url: string; orderId: string; amount: number }
  | { ok: false; message: string };

/** Team-plan ids as the gateway knows them. */
export const TEAM_PLAN_KEYS: Record<'monthly' | 'quarterly' | 'pro', string> = {
  monthly: 'team-monthly',
  quarterly: 'team-quarterly',
  pro: 'team-pro',
};

/** LinkedIn-plan ids as the gateway knows them. */
export const LINKEDIN_PLAN_KEYS: Record<'growth' | 'scale' | 'pro-annual', string> = {
  growth: 'linkedin-growth',
  scale: 'linkedin-scale',
  'pro-annual': 'linkedin-pro-annual',
};

export async function startCheckout(input: {
  plan: string;
  email: string;
  name: string;
  amount: number;
}): Promise<CheckoutResult> {
  try {
    const response = await fetch(CHECKOUT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.checkoutUrl) {
      return {
        ok: false,
        message:
          data.error === 'UPI observers are offline.'
            ? 'Payments are briefly unavailable. Please try again in a minute.'
            : data.error || 'Could not start the payment. Please try again.',
      };
    }
    return { ok: true, url: data.checkoutUrl, orderId: data.orderId, amount: data.amount };
  } catch {
    return { ok: false, message: 'Could not reach the payment gateway. Check your connection and retry.' };
  }
}

export type Lead = {
  name: string;
  phone: string;
  /** Interest key, locale-independent. */
  interest: 'presale' | 'offices' | 'retail' | 'investment';
};

export const INTEREST_KEYS: Lead['interest'][] = ['presale', 'offices', 'retail', 'investment'];

/**
 * Sends a lead to the CRM.
 * TODO: wire to the real endpoint (HubSpot / Pipedrive / serverless function).
 * Until then it simulates network latency and always succeeds.
 */
export async function submitLead(lead: Lead): Promise<void> {
  if (import.meta.env.DEV) console.info('[lead-capture] lead', lead);
  await new Promise((resolve) => setTimeout(resolve, 700));
}

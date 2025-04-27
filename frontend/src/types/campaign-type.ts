import { z } from 'zod';

export const PayoutSchema = z.object({
  country_code: z.string(),
  country_name: z.string(),
  amount: z.number(),
  id: z.number()
});

export const CampaignSchema = z.object({
  id: z.number(),
  title: z.string(),
  landing_page_url: z.string(),
  is_running: z.boolean(),
  payouts: z.array(PayoutSchema)
})

export type Campaign = z.infer<typeof CampaignSchema>;
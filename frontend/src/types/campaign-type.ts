import { z } from 'zod';

export const PayoutSchema = z.object({
  countryCode: z.string(),
  countryName: z.string(),
  amount: z.number(),
  id: z.number()
});

export const CampaignSchema = z.object({
  id: z.number(),
  title: z.string(),
  landingPageUrl: z.string(),
  isRunning: z.boolean(),
  payouts: z.array(PayoutSchema)
})

export type Campaign = z.infer<typeof CampaignSchema>;
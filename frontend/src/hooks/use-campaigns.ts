import { api, ENDPOINTS } from '@/api/api-client';
import { Campaign } from '@/types/campaign-type';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEYS = {
  CAMPAIGNS: 'campaigns',
}

async function fetchCampaigns() {
  const params: Record<string, string> = {};
  return api.get<Campaign[]>(ENDPOINTS.CAMPAIGNS, params);
}

export function useCampaigns() {

  const campaignsQuery = useQuery({
    queryKey: [QUERY_KEYS.CAMPAIGNS],
    queryFn: fetchCampaigns,
    staleTime: 1000 * 5 * 60,
    retry: 2,
  })

  return {
    campaigns: campaignsQuery.data || [],
    campaignsQuery,
  }
}
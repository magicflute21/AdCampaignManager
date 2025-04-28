import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/use-campaigns';
import { Campaign } from '@/types/campaign-type';
import { api, ENDPOINTS } from '@/api/api-client';
import { toast } from 'sonner';
import { useCampaignsStore } from '../src/store/useCampaignsStore';

interface PatchCampaignParams {
  id: number;
  isRunning: boolean;
}

async function patchCampaign(campaignId: number, isRunning: boolean) {
  return api.patch<Campaign>(`${ENDPOINTS.CAMPAIGNS}/status/${campaignId}`, {
    is_running: isRunning
  });
}

export function usePatchCampaign() {
  const queryClient = useQueryClient();
  const closeModal = useCampaignsStore((s) => s.closeModal)

  return useMutation<Campaign, unknown, PatchCampaignParams>({
    mutationFn: ({ id, isRunning }) => patchCampaign(id, isRunning),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CAMPAIGNS] });
      toast.success('Campaign updated successfully');
    },
    onError: () => {
      toast.error('Something went wrong')
    }
  });
}
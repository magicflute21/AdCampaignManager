import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui/dialog'
import {
  CheckCircle,
} from 'lucide-react'
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Campaign } from '@/types/campaign-type'
import { useCampaignsStore } from '@/store/useCampaignsStore'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Form,
} from "@/components/ui/form"
import { useState } from 'react'
import { usePatchCampaign } from 'hooks/usePatchCampaign'

export function CampaignDialog() {
  const isModalOpen = useCampaignsStore((s) => s.isModalOpen)
  const campaign = useCampaignsStore((s) => s.selectedCampaign)
  const setModalMode = useCampaignsStore((s) => s.setModalMode)
  const modalMode = useCampaignsStore((s) => s.modalMode)
  const closeModal = useCampaignsStore((s) => s.closeModal)
  const patchCampaignMutation = usePatchCampaign();

  if (!campaign) return null;

  function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }


  function EditModal({ campaign }: { campaign: Campaign }) {
    const form = useForm()
    const [editingCampaign, setEditingCampaign] = useState(campaign)

    function editCampaign(editC: Campaign) {
      patchCampaignMutation.mutate({
        id: editC.id,
        isRunning: editC.is_running,
      });
    }

    return (
      <Form {...form}>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>
            <Switch checked={editingCampaign.is_running} onCheckedChange={(value) => setEditingCampaign((prev) => ({
              ...prev,
              is_running: value
            }))} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Payout
            </Label>
            <div className='col-span-3 flex flex-col flex-wrap items-start gap-2'>
              {campaign.payouts.map((payout) => (
                <Badge key={payout.id} variant="outline">
                  <span className="text-sm text-violet-950 dark:text-gray-200">{getFlagEmoji(payout.country_code)}</span>
                  <span>{payout.country_name}</span>
                  <span className="font-medium ml-1">${payout.amount.toFixed(2)}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="submit" onClick={() => editCampaign(editingCampaign)} disabled={patchCampaignMutation.isPending}>Save</Button>
        </DialogFooter>
      </Form>
    )
  }

  function ViewModal({ campaign }: { campaign: Campaign }) {
    return (
      <>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>
            {campaign.is_running ? (
              <Badge variant="outline">
                <CheckCircle className="text-violet-600" />
                Active
              </Badge>
            ) : (
              <Badge variant="outline">
                <CheckCircle className="text-gray-400" />
                Not Active
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Payout
            </Label>
            <div className='col-span-3 flex flex-col flex-wrap items-start gap-2'>
              {campaign.payouts.map((payout) => (
                <Badge key={payout.id} variant="outline">
                  <span className="text-sm text-violet-950 dark:text-gray-200">{getFlagEmoji(payout.country_code)}</span>
                  <span>{payout.country_name}</span>
                  <span className="font-medium ml-1">${payout.amount.toFixed(2)}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="button" onClick={() => setModalMode('edit')}>Edit</Button>
        </DialogFooter>
      </>
    )
  }

  const Content = modalMode === 'view' ? ViewModal : EditModal;


  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => {
      if (!open) { closeModal() }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{campaign.title}</DialogTitle>
          <DialogDescription>
            {campaign.landing_page_url}
          </DialogDescription>
        </DialogHeader>
        <Content campaign={campaign} />
      </DialogContent>
    </Dialog>
  )
}
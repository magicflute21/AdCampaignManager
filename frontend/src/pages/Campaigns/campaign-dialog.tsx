import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui/dialog'
import {
  CheckCircle,
  Pencil
} from 'lucide-react'
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Campaign } from '@/types/campaign-type'
import { useCampaignsStore } from '@/store/useCampaignsStore'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useState } from 'react'

export function CampaignDialog() {
  const isModalOpen = useCampaignsStore((s) => s.isModalOpen)
  const campaign = useCampaignsStore((s) => s.selectedCampaign)
  const setModalMode = useCampaignsStore((s) => s.setModalMode)
  const modalMode = useCampaignsStore((s) => s.modalMode)
  const closeModal = useCampaignsStore((s) => s.closeModal)


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
    const [isRunning, setIsRunning] = useState(campaign.isRunning)

    return (
      <Form {...form}>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>
            <Switch checked={isRunning} onCheckedChange={() => setIsRunning((prev) => !prev)} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Payout
            </Label>
            <div className='col-span-3 flex flex-col flex-wrap items-start gap-2'>
              {campaign.payouts.map((payout) => (
                <Badge key={payout.id} variant="outline">
                  <span className="text-sm text-violet-950 dark:text-gray-200">{getFlagEmoji(payout.countryCode)}</span>
                  <span>{payout.countryName}</span>
                  <span className="font-medium ml-1">${payout.amount.toFixed(2)}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setModalMode('view')}>Cancel</Button>
          <Button type="submit">Save</Button>
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
            {campaign.isRunning ? (
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
                  <span className="text-sm text-violet-950 dark:text-gray-200">{getFlagEmoji(payout.countryCode)}</span>
                  <span>{payout.countryName}</span>
                  <span className="font-medium ml-1">${payout.amount.toFixed(2)}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => closeModal()}>Close</Button>
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
            {campaign.landingPageUrl}
          </DialogDescription>
        </DialogHeader>
        <Content campaign={campaign} />
      </DialogContent>
    </Dialog>
  )
}
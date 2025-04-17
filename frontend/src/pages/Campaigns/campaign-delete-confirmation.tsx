import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCampaignsStore } from "@/store/useCampaignsStore"

export function CampaignDeleteConfirmation() {
  const isDeleteAlertOpen = useCampaignsStore((s) => s.isDeleteAlertOpen)
  const selectedCampaign = useCampaignsStore((s) => s.selectedCampaign)
  const closeAlertModal = useCampaignsStore((s) => s.closeAlertModal)

  return (
    <AlertDialog open={isDeleteAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete campaign <br /><span className="underline decoration-blue-500 ">{selectedCampaign?.title}</span>?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The campaign will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closeAlertModal()}>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
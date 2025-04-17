import { MessageCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

export function DashboardBanner() {
  return (
    <div className="px-4 lg:px-6">
      <Alert variant="informative" >
        <MessageCircle className="h-4 w-4" />
        <AlertDescription>
          The dashboard just has some nice looking placeholders. The main meat of the project is in the Campaigns page.
        </AlertDescription>
      </Alert>
    </div>
  )
}
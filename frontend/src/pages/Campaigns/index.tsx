import { DataTable } from "@/components/layout/data-table"
import { SearchBar } from "@/components/layout/searchbar";
import { CampaignSkeleton } from "./campaign-skeleton";
import { CampaignDialog } from "./campaign-dialog";
import { CampaignDeleteConfirmation } from "./campaign-delete-confirmation";
import { useCampaigns } from "@/hooks/use-campaigns";

export default function Campaigns() {
  const { campaignsQuery } = useCampaigns();

  return (
    <>
      {campaignsQuery.isLoading ? (
        <CampaignSkeleton />
      ) : (
        <>
          <SearchBar />
          <DataTable />

          <CampaignDialog />
          <CampaignDeleteConfirmation />
        </>
      )}
    </>
  )
}
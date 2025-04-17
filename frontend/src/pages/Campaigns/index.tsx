import { DataTable } from "@/components/layout/data-table"
import data from '../../dummydata/adData.json';
import { SearchBar } from "@/components/layout/searchbar";
import { CampaignSkeleton } from "./campaign-skeleton";
import { CampaignDialog } from "./campaign-dialog";
import { CampaignDeleteConfirmation } from "./campaign-delete-confirmation";

export default function Campaigns() {
  const isLoading = false;
  return (
    <>
      {isLoading ? (
        <CampaignSkeleton />
      ) : (
        <>
          <SearchBar />
          <DataTable data={data} />


          <CampaignDialog />
          <CampaignDeleteConfirmation />
        </>
      )}
    </>
  )
}
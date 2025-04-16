import { DataTable } from "@/components/layout/data-table"
import data from '../../dummydata/adData.json';
import { SearchBar } from "@/components/layout/searchbar";
import { CampaignSkeleton } from "./campaign-skeleton";

export default function Campaigns() {
  const isLoading = true;
  return (
    <>
      {isLoading ? (
        <CampaignSkeleton />
      ) : (
        <>
          <SearchBar />
          <DataTable data={data} />
        </>
      )}
    </>
  )
}
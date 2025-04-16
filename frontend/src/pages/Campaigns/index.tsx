import { DataTable } from "@/components/layout/data-table"
import data from '../../dummydata/adData.json';
import { SearchBar } from "@/components/layout/searchbar";

export default function Campaigns() {
  return (
    <>
      <SearchBar />
      <DataTable data={data} />
    </>
  )
}
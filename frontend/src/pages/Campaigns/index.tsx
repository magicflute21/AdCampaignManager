import { DataTable } from "@/components/ui/data-table"
import data from "../../components/layout/data.json";

export default function Campaigns() {
  return (
    <>
      <DataTable data={data} />
    </>
  )
}
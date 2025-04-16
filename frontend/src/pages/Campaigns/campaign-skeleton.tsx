import { Skeleton } from "@/components/ui/skeleton"

export function DataTableSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="w-full h-[34rem] rounded-md" />
      <Skeleton className="w-[35rem] h-[2.5rem] rounded-md self-end" />
    </div>
  )
}

export function CampaignSkeleton() {
  return (
    <div className="px-4 lg:px-6 flex flex-col gap-6">
      <Skeleton className="w-full h-[2.5rem] rounded-md" />
      <div className="flex justify-between">
        <Skeleton className="w-[200px] h-[2.5rem] rounded-md" />
        <Skeleton className="w-[200px] h-[2.5rem] rounded-md" />
      </div>
      <DataTableSkeleton />
    </div>
  )
}
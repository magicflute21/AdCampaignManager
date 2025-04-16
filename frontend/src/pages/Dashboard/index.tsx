import { SectionCards } from "@/components/layout/section-cards"
import { ChartAreaInteractive } from "@/components/layout/chart-area-interactive"


export default function Dashboard() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  )
}
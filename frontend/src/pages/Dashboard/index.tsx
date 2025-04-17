import { SectionCards } from "@/pages/Dashboard/section-cards"
import { ChartAreaInteractive } from "@/pages/Dashboard/chart-area-interactive"
import { DashboardBanner } from "./dashboard-banner"


export default function Dashboard() {
  return (
    <>
      <DashboardBanner />
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  )
}
import { useMemo, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ColumnsIcon,
  MoreVerticalIcon,
} from "lucide-react"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/layout/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Campaign, CampaignSchema } from "@/types/campaign-type"
import { useCampaignsStore } from "@/store/useCampaignsStore"
import { useCampaigns } from "@/hooks/use-campaigns"
import { CAMPAIGN_TABS } from "@/lib/constants"
import { CampaignsTableUI } from "./campaigns-table-ui"

function CampaignTitleCell({ item }: { item: Campaign }) {
  const openModal = useCampaignsStore((s) => s.openModal)

  return (
    <Button variant="link" onClick={() => { openModal(item, 'view') }} className="w-fit px-0 text-left text-foreground cursor-pointer">{item.title}</Button>
  )
}

function MenuEdit({ item }: { item: Campaign }) {
  const openModal = useCampaignsStore((s) => s.openModal)
  return (
    <DropdownMenuItem onClick={() => openModal(item, 'edit')}>Edit</DropdownMenuItem>
  )
}

function MenuView({ item }: { item: Campaign }) {
  const openModal = useCampaignsStore((s) => s.openModal)
  return (
    <DropdownMenuItem onClick={() => openModal(item, 'view')}>View</DropdownMenuItem>
  )
}

function MenuDelete({ item }: { item: Campaign }) {
  const openAlertModal = useCampaignsStore((s) => s.openAlertModal)

  return (
    <DropdownMenuItem onClick={() => openAlertModal(item)}>Delete</DropdownMenuItem>
  )
}

const columns: ColumnDef<z.infer<typeof CampaignSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <CampaignTitleCell item={row.original} />
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'landing_page_url',
    header: 'URL',
    cell: ({ row }) => (
      <a href={row.original.landing_page_url} target="_blank">
        <span>{row.original.landing_page_url}</span>
      </a>
    ),
  },
  {
    accessorKey: "is_running",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 px-1.5">
        {!row.original.is_running ? (
          <div className="rounded-full bg-gray-300 size-2"></div>
        ) : (
          <div className="rounded-full bg-violet-400 size-2"></div>
        )}
        {row.original.is_running ? 'Running' : 'Not Started'}
      </div>
    ),
  },
  {
    accessorKey: "payouts",
    header: "Payout",
    cell: ({ row }) => {
      const SHOW_LENGTH = 2;
      const payoutCountries = row.original.payouts.slice(0, SHOW_LENGTH);

      return (
        <div className="flex items-center gap-0.5">
          {payoutCountries.map((country) => (
            <Badge
              key={country.id}
              variant="outline"
              className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
            >
              {country.country_code}
            </Badge>
          ))}
          {row.original.payouts.length > SHOW_LENGTH && (
            <Badge
              variant="outline"
              className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
            >
              +{row.original.payouts.length - SHOW_LENGTH}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <MenuEdit item={row.original} />
          <MenuView item={row.original} />
          <DropdownMenuSeparator />
          <MenuDelete item={row.original} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
export function DataTable() {
  const [activeTab, setActiveTab] = useState<string>(CAMPAIGN_TABS.ALL)
  const { campaigns } = useCampaigns();
  const data = useMemo(() => {
    if (activeTab === CAMPAIGN_TABS.ALL) return campaigns
    return campaigns.filter((camp) => camp.is_running) || []
  }, [campaigns, activeTab])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const activeCampaigns = useMemo(() => data.filter(c => c.is_running), [data])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <Tabs
      value={activeTab}
      className="flex w-full flex-col justify-start gap-6"
      onValueChange={setActiveTab}
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger
            className="@4xl/main:hidden flex w-fit"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CAMPAIGN_TABS.ALL}>All</SelectItem>
            <SelectItem value={CAMPAIGN_TABS.RUNNING}>Running Campaigns</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="@4xl/main:flex hidden">
          <TabsTrigger value={CAMPAIGN_TABS.ALL}>All</TabsTrigger>
          <TabsTrigger value={CAMPAIGN_TABS.RUNNING} className="gap-1">
            Running Campaigns{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              {activeCampaigns.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ColumnsIcon />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="pop" onClick={() => console.log('click')}>+ Create New</Button>
        </div>
      </div>
      <CampaignsTableUI table={table} columns={columns} />
    </Tabs>
  )
}
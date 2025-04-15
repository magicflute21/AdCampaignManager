import { NAV } from '@/lib/constants'
import { create } from 'zustand'

export type PageName = typeof NAV[keyof typeof NAV]

interface RouteStoreState {
  currentPage: {
    id: PageName,
    name: string
  }
}

interface RouteStoreActions {
  setCurrentPage: (page: { id: PageName, name: string }) => void
}

export interface IRouteStore extends RouteStoreState, RouteStoreActions {}

const useRouteStore = create<IRouteStore>((set) => ({
  currentPage:{id: NAV.DASHBOARD, name: 'Dashboard'},
  setCurrentPage: (page) => set({ currentPage: page }),
}))

export default useRouteStore
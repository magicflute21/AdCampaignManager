import { Campaign } from '@/types/campaign-type';
import { create } from 'zustand'

type ModalMode = 'edit' | 'view' | 'delete'

interface CampaignState {
  isModalOpen: boolean
  selectedCampaign: Campaign | null
  modalMode: ModalMode
  isDeleteAlertOpen: boolean
}

interface CampaignActions {
  openModal: (campaign: Campaign, viewMode: ModalMode) => void
  closeModal: () => void
  setModalMode: (mode: ModalMode) => void
  openAlertModal: (campaign: Campaign) => void
  closeAlertModal: () => void
}

export interface ICampaignStore extends CampaignState, CampaignActions { }

export const useCampaignsStore = create<ICampaignStore>((set) => ({
  isModalOpen: false,
  selectedCampaign: null,
  modalMode: 'view',
  isDeleteAlertOpen: false,

  openModal: (campaign, mode) => set({
    isModalOpen: true,
    selectedCampaign: campaign,
    modalMode: mode
  }),

  closeModal: () => set({
    isModalOpen: false,
    selectedCampaign: null,
    modalMode: 'view'
  }),

  setModalMode: (mode) => set({
    modalMode: mode
  }),

  openAlertModal: (campaign) => set({
    isDeleteAlertOpen: true,
    selectedCampaign: campaign
  }),

  closeAlertModal: () => set({
    isDeleteAlertOpen: false,
    selectedCampaign: null
  })
}));
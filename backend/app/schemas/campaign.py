from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CampaignPayoutBase(BaseModel):
    country_code: str
    country_name: str
    amount: float

class CampaignPayoutCreate(CampaignPayoutBase):
    pass

class CampaignPayout(CampaignPayoutBase):
    id: int
    campaign_id: int
    
    class Config:
        orm_mode = True

class CampaignBase(BaseModel):
    title: str
    landing_page_url: str
    is_running: Optional[bool] = True

class CampaignCreate(CampaignBase):
    payouts: Optional[List[CampaignPayoutCreate]] = []

class CampaignUpdate(BaseModel):
    title: Optional[str] = None
    landing_page_url: Optional[str] = None
    is_running: Optional[bool] = None

class Campaign(CampaignBase):
    id: int
    created_at: datetime
    payouts: List[CampaignPayout] = []
    
    class Config:
        orm_mode = True
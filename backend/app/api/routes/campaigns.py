from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.campaign import Campaign
from app.schemas.campaign import Campaign as CampaignSchema

router = APIRouter()

@router.get("/", response_model=List[CampaignSchema])
def get_campaigns(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).offset(skip).limit(limit).all()
    return campaigns
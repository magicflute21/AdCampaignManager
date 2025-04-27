from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import logging
from sqlalchemy.orm import Query as SQLAlchemyQuery

from app.db.database import get_db
from app.models.campaign import Campaign
from app.schemas.campaign import Campaign as CampaignSchema


logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/", response_model=List[CampaignSchema])
def get_campaigns(
  skip: int = 0, 
  limit: int = 100, 
  db: Session = Depends(get_db),
  isRunning: Optional[bool] = Query(None)
  ):
  try:
      logger.info(f"Get campaigns request - skip: {skip}, limit: {limit}, is_running: {isRunning}")
      
      query = db.query(Campaign)
      
      if isRunning is not None: 
          logger.info(f"Filtering campaigns by is_running={isRunning}")
          query = query.filter(Campaign.is_running == isRunning)
      
      campaigns = query.offset(skip).limit(limit).all()
      
      if campaigns is None:
          logger.error("Query returned None instead of a list of campaigns")
          campaigns = []
      
      logger.info(f"Returning {len(campaigns)} campaigns")
      return campaigns
  
  except Exception as e:
      logger.error(f"Error retrieving campaigns: {str(e)}")
      return []
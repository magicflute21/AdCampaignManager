from fastapi import APIRouter, Depends, HTTPException, Query, Body, Path
from app.api.routes import campaigns
from sqlalchemy.orm import Session
from typing import List, Optional
import logging
from sqlalchemy.orm import Query as SQLAlchemyQuery

from app.db.database import get_db
from app.models.campaign import Campaign
from app.schemas.campaign import Campaign as CampaignSchema


logger = logging.getLogger(__name__)
router = APIRouter()
router.include_router(campaigns.router, prefix="/campaigns", tags=["campaigns"])



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
      
      query = query.order_by(Campaign.id)

      campaigns = query.offset(skip).limit(limit).all()
      
      if campaigns is None:
          logger.error("Query returned None instead of a list of campaigns")
          campaigns = []
      
      logger.info(f"Returning {len(campaigns)} campaigns")
      return campaigns
  
  except Exception as e:
      logger.error(f"Error retrieving campaigns: {str(e)}")
      raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.patch("/status/{campaign_id}")
def update_campaign_status(
    campaign_id: int = Path(..., title="The ID of the campaign to update"),
    is_running: bool = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    try:
        logger.info(f"Updating campaign {campaign_id} status to is_running={is_running}")
        
        # Find the campaign by ID
        campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
        
        if not campaign:
            logger.error(f"Campaign with id {campaign_id} not found")
            raise HTTPException(status_code=404, detail="Campaign not found")
        
        # Update the campaign status
        campaign.is_running = is_running
        db.commit()
        db.refresh(campaign)
        
        logger.info(f"Successfully updated campaign {campaign_id} status")
        return campaign
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating campaign status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/test")
def test_route():
    return {"message": "Campaigns router is working"}

@router.patch("/test", response_model=dict)
def test_patch(data: dict = Body(...)):
    return {"received": data}

@router.get("/test/{test_id}")
def test_param(test_id: int):
    return {"message": f"Test ID: {test_id}"}

@router.patch("/test-patch")
def test_patch_endpoint(data: dict = Body(...)):
    return {"message": "PATCH endpoint working", "received": data}
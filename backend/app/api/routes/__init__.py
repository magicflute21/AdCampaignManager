from fastapi import APIRouter
from app.api.routes import campaigns

api_router = APIRouter()
api_router.include_router(campaigns.router, prefix="/campaigns", tags=["campaigns"])
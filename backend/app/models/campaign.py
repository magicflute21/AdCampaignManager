from sqlalchemy import Column, Integer, String, Boolean, Text
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship

from app.db.database import Base

class Campaign(Base):
    __tablename__ = "campaigns"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    landing_page_url = Column(String, nullable=False)
    is_running = Column(Boolean, default=True)
    
    payouts = relationship("CampaignPayout", back_populates="campaign", cascade="all, delete-orphan")
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False)
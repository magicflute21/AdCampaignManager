from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship

from app.db.database import Base

class CampaignPayout(Base):
    __tablename__ = "campaign_payouts"
    
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id", ondelete="CASCADE"))
    country_code = Column(String(2), nullable=False)
    country_name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    
    campaign = relationship("Campaign", back_populates="payouts")
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False)
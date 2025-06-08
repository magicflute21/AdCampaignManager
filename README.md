# Campaign Manager

A full-stack application for managing marketing campaigns with regional payout information.

![Dashboard Screenshot](src/assets/dashboard.png)

Professional dashboard template built with React, shadcn/ui, and Recharts, adaptable for monitoring and data visualization use cases.

## Overview

This application provides a management interface for marketing campaigns. It consists of:

- **Backend**: FastAPI (Python) REST API with PostgreSQL database
- **Frontend**: React with shadcn/ui components
- **Infrastructure**: Docker containerization for easy setup and deployment

### Key Features

- Dashboard overview of campaign performance
- Campaign management interface
- View and edit campaign details
- Toggle campaign active status
- Regional payout management

## Tech Stack

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- Alembic migrations
- PostgreSQL database

### Frontend
- React
- shadcn/ui component library
- Vite build tool

### Infrastructure
- Docker & Docker Compose
- PostgreSQL

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine

### Running the Application

1. Clone this repository
2. Navigate to the project directory
3. Create a `.env` file in the root directory with the following content:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=campaign_manager_db
```

4. Start the application:
```bash
docker-compose up
```

5. The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

The first startup may take a few minutes as Docker builds the images and initializes the database.

## Application Structure
### Backend
The backend provides a RESTful API for managing campaigns:

GET /api/campaigns/ - List all campaigns
PATCH /api/campaigns/{id} - Update a campaign

Database tables are automatically created and seeded with sample data on first run.

### Frontend
The frontend consists of two main pages:

Dashboard - Overview of campaign metrics
Campaigns - List of campaigns with edit functionality

Development
The Docker setup includes:

Hot-reloading for both frontend and backend
Volume mounts for local development
Automatic database migrations

## Project Structure

```bash
campaign-manager/
├── backend/               # Python FastAPI backend
│   ├── alembic/           # Database migrations
│   ├── app/               # Application code
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core configuration
│   │   ├── db/            # Database setup
│   │   ├── models/        # SQLAlchemy models
│   │   └── schemas/       # Pydantic schemas
│   ├── Dockerfile         # Backend Docker configuration
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend
│   ├── src/               # Source code
│   │   ├── api/           # Api client
│   │   ├── assets/        # Assets, logos
│   │   ├── components/    # UI components
│   │   ├── components/    # React custom hooks
│   │   ├── lib/           # Helper functions
│   │   ├── pages/         # Application pages
│   │   ├── store/         # State management
│   │   └── types/         # Typescript interfaces
│   ├── Dockerfile         # Frontend Docker configuration
│   └── package.json       # Node.js dependencies
├── docker-compose.yml     # Docker Compose configuration
└── .env                   # Environment variables
```
## 🧩Personal Notes

When building these kinds of small applications, I find it a great opportunity to try out new ways of doing things. This time the big new thing for me was using the shandcn/ui library for the frontend layout and components. Wow, I was kinda blown away how great of a experience working with that library was. The dashboard was up and running maybe even too fast! And the fact that you can pick and choose only the components that you need and get an access to the source code is quite an unique approach and makes for a very lightweight library. It certainly brought new perspectives for me.

Most of my working experience has been frontend focused and I'm gradually learning more backend technologies. This time wanted to use python with fastapi. Let's be honest, for the backend I did have to use the help of llms - setting up a new project from scratch for a backend junior is not an easy task and would have taken me a lot more time than to accomplish all that was done here (get and patch api endpoints, automatic alembic migrations etc.). So in order to support the frontend with actual functionalities, I had to take this shortcut. 

I really wanted to setup docker for this project too, to make for an as-smooth-as-possible handover. Who wants to struggle with all the first installation setups when having a raw and non-containerized project at hand. Nuhuh, not me, and certainly not you. So hopefully the docker initialization works as smoothly for you as it does for me. Fingers crossed 🤞


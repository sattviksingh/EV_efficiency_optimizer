# Development Guide - EV Efficiency Optimizer

Complete guide for setting up, developing, and deploying the EV Efficiency Optimizer application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Database Setup](#database-setup)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Git Workflow](#git-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **OS**: Linux, macOS, or Windows (with WSL2 for Windows)
- **Python**: 3.9 or higher
- **Node.js**: 16 or higher
- **npm**: 8 or higher
- **Docker**: Latest version (optional but recommended)
- **Git**: Latest version

### Tools to Install

```bash
# On macOS (using Homebrew)
brew install python@3.11 node postgresql redis

# On Ubuntu/Debian
sudo apt-get install python3.11 python3.11-venv nodejs npm postgresql redis-server

# On Windows (using Chocolatey)
choco install python nodejs postgresql redis
```

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/ev-efficiency-optimizer.git
cd ev-efficiency-optimizer
```

### 2. Create Environment Files

```bash
cp .env.example .env
# Edit .env with your configuration
nano .env
```

### 3. Install Pre-commit Hooks (Optional)

```bash
pip install pre-commit
pre-commit install
```

## Backend Development

### 1. Setup Python Environment

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt
```

### 2. Database Setup

```bash
# For development (SQLite):
# No setup needed, created automatically on first run

# For production (PostgreSQL):
createdb evoptimizer
createuser evoptimizer
psql evoptimizer
# ALTER USER evoptimizer WITH PASSWORD 'your-password';
# GRANT ALL PRIVILEGES ON DATABASE evoptimizer TO evoptimizer;
```

### 3. Run Migrations

```bash
# Initialize migrations (first time only)
alembic init migrations

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 4. Start Backend Server

```bash
# Development server with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or use the run script
python -m app.main
```

Backend will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/api/docs`

### 5. Backend Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Configuration
│   ├── routes/              # API endpoints
│   ├── models/              # Data models
│   ├── services/            # Business logic
│   ├── ml_models/           # ML models
│   ├── utils/               # Utilities
│   └── tests/               # Unit tests
├── migrations/              # Database migrations
├── requirements.txt
├── Dockerfile
└── pytest.ini
```

## Frontend Development

### 1. Setup Node.js Environment

```bash
cd frontend

# Install dependencies
npm install

# Or use npm ci for exact versions (recommended in CI/CD)
npm ci
```

### 2. Create Environment File

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
nano .env.local
```

Example .env.local:
```
VITE_API_URL=http://localhost:8000/api
VITE_DEBUG=true
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

### 5. Frontend Project Structure

```
frontend/
├── src/
│   ├── index.jsx            # Entry point
│   ├── App.jsx              # Root component
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom hooks
│   ├── services/            # API services
│   ├── store/               # State management
│   ├── styles/              # Global styles
│   ├── utils/               # Utilities
│   ├── assets/              # Images, fonts
│   └── __tests__/           # Component tests
├── public/
├── package.json
└── vite.config.js
```

## Database Setup

### PostgreSQL Development Setup

```bash
# Start PostgreSQL service
# macOS
brew services start postgresql

# Linux
sudo service postgresql start

# Windows (using pgAdmin)
# Use pgAdmin UI or psql

# Connect to database
psql -U postgres

# Create database and user
CREATE DATABASE evoptimizer;
CREATE USER evoptimizer WITH PASSWORD 'dev_password';
GRANT ALL PRIVILEGES ON DATABASE evoptimizer TO evoptimizer;
ALTER DATABASE evoptimizer OWNER TO evoptimizer;
```

### Using Docker for Database

```bash
# Start PostgreSQL in Docker
docker run -d \
  --name pg-dev \
  -e POSTGRES_DB=evoptimizer \
  -e POSTGRES_USER=evoptimizer \
  -e POSTGRES_PASSWORD=dev_password \
  -p 5432:5432 \
  postgres:15-alpine

# Connect to database
psql -h localhost -U evoptimizer -d evoptimizer
```

### pgAdmin Web Interface

```bash
docker run -d \
  --name pgadmin-dev \
  -e PGADMIN_DEFAULT_EMAIL=admin@example.com \
  -e PGADMIN_DEFAULT_PASSWORD=admin \
  -p 5050:80 \
  dpage/pgadmin4:latest

# Access at http://localhost:5050
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_routes.py

# Run with verbose output
pytest -v

# Run tests in watch mode
pytest-watch

# Run tests matching a pattern
pytest -k "test_trip" -v
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Dashboard.test.jsx

# Run tests with UI
npm run test:ui
```

### Test Coverage Requirements

- Backend: Minimum 80% coverage for critical paths
- Frontend: Minimum 70% coverage for components

## Code Quality

### Backend Code Quality

```bash
cd backend

# Format code with Black
black app/

# Lint with Flake8
flake8 app/

# Type checking with mypy
mypy app/

# Import sorting with isort
isort app/

# Run all quality checks
black app/ && flake8 app/ && mypy app/ && isort app/
```

### Frontend Code Quality

```bash
cd frontend

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type checking (if using TypeScript)
npm run type-check
```

### Pre-commit Hook Example

Create `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json

  - repo: https://github.com/psf/black
    rev: 23.12.0
    hooks:
      - id: black

  - repo: https://github.com/PyCQA/flake8
    rev: 6.1.0
    hooks:
      - id: flake8
```

## Git Workflow

### Branch Naming

```
feature/description          # New features
bugfix/description          # Bug fixes
hotfix/description          # Production hotfixes
refactor/description        # Code refactoring
docs/description            # Documentation
chore/description           # Maintenance tasks
```

### Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(trips): add trip pause/resume functionality

Add ability to pause and resume trips without ending them.
Implement pause state in database schema and update API routes.

Closes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

### Git Workflow Steps

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Create Pull Request on GitHub
# - Add description
# - Link related issues
# - Request reviewers
# - Ensure CI/CD passes

# After approval, merge and delete branch
git checkout main
git pull origin main
git merge feature/your-feature
git push origin main
git branch -d feature/your-feature
```

## Deployment

### Docker Compose Deployment

```bash
# Development
docker-compose -f docker-compose.yml up -d

# Production
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Server Deployment

```bash
# SSH into server
ssh user@server-ip

# Clone repository
git clone https://github.com/yourusername/ev-efficiency-optimizer.git
cd ev-efficiency-optimizer

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
gunicorn app.main:app -w 4 -b 0.0.0.0:8000

# Frontend setup
cd ../frontend
npm install
npm run build
npm install -g serve
serve -s dist -l 3000
```

### Environment Variables for Production

Create `.env` with production values:

```
ENVIRONMENT=production
DEBUG=false
DATABASE_URL=postgresql://user:password@db-host:5432/dbname
SECRET_KEY=<generate-secure-key>
CORS_ORIGINS=https://yourdomain.com
```

### Database Backup

```bash
# Backup PostgreSQL database
pg_dump -h localhost -U evoptimizer evoptimizer > backup.sql

# Restore database
psql -h localhost -U evoptimizer evoptimizer < backup.sql

# Schedule regular backups (cron)
0 2 * * * pg_dump -h localhost -U evoptimizer evoptimizer > /backups/backup_$(date +\%Y\%m\%d).sql
```

## Troubleshooting

### Common Issues

#### Backend Issues

**Port already in use**
```bash
# Find process using port
lsof -i :8000

# Kill process
kill -9 <PID>
```

**Database connection error**
```bash
# Check PostgreSQL is running
psql -h localhost -U postgres

# Check DATABASE_URL in .env
# Format: postgresql://username:password@localhost:5432/dbname
```

**Import errors**
```bash
# Reinstall dependencies
pip install --force-reinstall -r requirements.txt

# Check Python version
python --version  # Should be 3.9+
```

#### Frontend Issues

**npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 in use**
```bash
# Vite will prompt to use different port, or:
npm run dev -- --port 5174
```

**API calls failing**
```bash
# Check VITE_API_URL in .env.local
# Check backend is running: curl http://localhost:8000/health
# Check CORS configuration in backend config.py
```

### Debug Mode

**Backend Debug**
```python
# Add to app/main.py
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.debug("Debug message")
```

**Frontend Debug**
```javascript
// Add to src/main.jsx
if (import.meta.env.DEV) {
  console.log('Development mode');
  window.__DEBUG__ = true;
}

// Check in components
if (window.__DEBUG__) console.log('Debug info');
```

## Performance Optimization

### Backend Optimization

```python
# Use connection pooling
# Add to config.py:
SQLALCHEMY_ENGINE_OPTIONS = {
    "pool_size": 10,
    "pool_recycle": 3600,
    "pool_pre_ping": True,
}

# Use caching
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_operation(param):
    return result
```

### Frontend Optimization

```javascript
// Code splitting with React.lazy
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Memoization
import { memo } from 'react';
const Chart = memo(({ data }) => {...});

// Virtual scrolling for long lists
import { FixedSizeList } from 'react-window';
```

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: December 2024
**Version**: 1.0.0

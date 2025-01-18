# IGDTUW Events Web Application

- A full-stack web application designed to manage college events and societies, providing features to list, update, delete, and view events. This project was developed to streamline event management, improve user experience, and ensure secure access control for users.

## Features

- **Component-Based UI Development**: Built reusable, high-performance components with React and Next.js for a seamless user experience.
- **Authentication and Authorization**: Implemented **Clerk Authentication** for secure user access, including multi-factor authentication (MFA) and session management.
- **Containerized Development**: Leveraged **Docker** for standardizing development and deployment, ensuring portability and reducing environment inconsistencies.
- **Event Lifecycle Management**: Designed APIs for CRUD (Create, Read, Update, Delete) operations to manage event data efficiently with transactional integrity.
- **Data Persistence**: Used **PostgreSQL** as the relational database for storing event and user information.

## Technologies Used

- **Frontend**: Next.js, React
- **Backend**: Golang
- **Authentication**: Clerk Authentication
- **Containerization**: Docker
- **Database**: PostgreSQL
- **API**: RESTful APIs

## Getting Started

Follow the steps below to set up the project locally:

### Prerequisites

Make sure you have the following installed:
- Docker
- Node.js (for Next.js)
- Golang (for the backend)

### Installation

1. Clone the repository:
   ```bash
   - git clone https://github.com/your-username/igdtuw-events.git
   - cd igdtuw-events
2. Frontend Setup:
 - Navigate to the frontend directory:
   cd frontend
 - Install dependencies:
   npm install
3. Backend Setup:
- Navigate to the backend directory:
  cd backend
- Install Go dependencies:
  go mod tidy
4. Run with Docker: To start both the frontend and backend services with Docker, run the following:
- docker-compose up

5. Visit http://localhost:3000 to view the application.

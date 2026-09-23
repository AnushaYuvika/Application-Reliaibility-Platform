## Demo Credentials

**Email:** developer@example.com  
**Password:** developer123

**Live Demo:**  
https://application-reliaibility-platform.vercel.app


# Autonomous Software Reliability & Incident Response Platform

A full-stack software reliability platform designed to help development teams monitor applications, investigate production incidents, generate remediation recommendations, validate fixes, and maintain incident history.

## Overview

Software failures in production often require developers to manually collect logs, inspect system behavior, identify the probable root cause, decide on remediation, and verify whether the issue has been resolved.

This platform brings these activities into a single workflow.

It combines monitoring data, incident investigation, response generation, human approval, verification, and reporting into one application.

## Problem Statement

When a production incident occurs, developers may need to:

* Search through application logs
* Identify relevant evidence
* Understand the probable root cause
* Determine the impact of the incident
* Decide how to remediate the issue
* Validate whether the remediation worked
* Maintain a record of what happened

These steps can become fragmented across multiple tools and manual processes.

## Solution

The platform provides a structured incident-response workflow:

```text
Application Monitoring
        ↓
Incident
        ↓
Investigation
        ↓
Root Cause Analysis
        ↓
Response Generation
        ↓
Human Approval
        ↓
Verification
        ↓
Incident Report
```

The system is designed around a human-in-the-loop approach. Automated analysis can prepare investigation findings and remediation recommendations, while the final remediation decision remains with the developer.

## Key Features

### Authentication

* JWT-based authentication
* Protected API routes
* Developer/Admin roles
* Secure password hashing with bcrypt

### Project Management

* Create projects
* Edit project information
* Delete projects
* Repository configuration
* Environment management
* Project status tracking

### Monitoring

The monitoring section supports:

* Application logs
* System metrics
* Deployment activity

Monitoring data is associated with individual projects.

### Incident Management

* Create and track incidents
* Incident severity
* Incident status
* Incident timestamps
* Project-specific incidents
* Active and resolved incident tracking

### Autonomous Investigation

The investigation workflow analyzes available incident data and monitoring logs to produce:

* Evidence
* Probable root cause
* Impact analysis
* Confidence information

This allows the platform to move from a raw incident toward a structured investigation.

### Response Generation

Based on investigation findings, the platform generates:

* Recommended action
* Supporting reasoning
* Proposed remediation steps

The developer can review the generated response before approval.

### Human Approval

The remediation process remains human-controlled.

A developer can:

* Approve the response
* Reject the response
* Review the recommendation before proceeding

### Verification

After approval, the platform provides a verification stage to validate whether the proposed remediation resolves the incident condition.

Verification records include:

* Test name
* Test description
* Result
* Output
* Verification status
* Verification timestamp

### Reports

The Reports section provides an overview of:

* Project information
* Incident history
* Incident status
* Reliability information
* Generated incident reports

## Technology Stack

### Frontend

* React
* React Router
* JavaScript
* HTML
* CSS
* Vite

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* bcrypt

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

## Architecture

```text
                React Frontend
                      │
                      │ REST API
                      ↓
                Express.js API
                      │
             ┌────────┴────────┐
             │                 │
        JWT Authentication   Controllers
                               │
                               ↓
                          Mongoose Models
                               │
                               ↓
                           MongoDB
```

## Incident Response Architecture

```text
                    Project
                       │
                       ↓
                  Monitoring
               ┌──────┼──────┐
               ↓      ↓      ↓
             Logs   Metrics  Deployments
               │
               ↓
            Incident
               │
               ↓
         Investigation
          ┌────┼────┐
          ↓    ↓    ↓
       Evidence Root  Impact
                 Cause
                  │
                  ↓
             Response
          ┌───────┴────────┐
          ↓                ↓
   Recommendation      Remediation
          │                │
          └───────┬────────┘
                  ↓
            Human Approval
                  │
                  ↓
             Verification
                  │
                  ↓
                Report
```

## Project Structure

```text
autonomous-software-reliability-platform/
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── ...
│
├── .gitignore
└── README.md
```

## Main Application Workflow

### 1. Login

The developer authenticates using the application.

### 2. Create or Select Project

A project is configured with its repository and environment.

### 3. Monitor Application

The platform displays available logs, metrics, and deployment information for the selected project.

### 4. Investigate Incident

When an incident is available, the investigation stage analyzes the available monitoring evidence.

### 5. Generate Response

The platform prepares a recommendation and proposed remediation based on the investigation findings.

### 6. Human Approval

The developer reviews the proposed response and decides whether it should proceed.

### 7. Verify

The approved remediation is validated through the verification workflow.

### 8. Report

The incident and its lifecycle can be reviewed through the reporting section.

## Local Setup

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB Atlas account
* Git

### Clone Repository

```bash
git clone https://github.com/AnushaYuvika/Application-Reliaibility-Platform.git
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on the Vite development server.

## Security

Sensitive configuration values such as:

* MongoDB credentials
* JWT secrets
* Environment variables

are stored in `.env` and excluded from Git using `.gitignore`.

## Future Enhancements

The current application provides the core incident-response workflow. Future versions can extend the platform with:

* Real-time log ingestion
* Application monitoring agents
* Webhook integrations
* GitHub/GitLab integration
* CI/CD integration
* Real-time incident detection
* Advanced AI-based root-cause analysis
* Automated test execution
* Pull Request generation
* Production deployment integrations
* Notification and alerting systems
* Advanced reliability metrics such as MTTR and uptime

## Current MVP

The current MVP demonstrates the complete workflow from project monitoring to incident investigation, response generation, human approval, verification, and reporting.

The architecture is designed so that external monitoring, logging, deployment, and repository systems can be integrated in future versions.

## Author

**Anusha Yuvika**
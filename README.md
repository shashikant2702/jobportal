# Job Portal

A job portal application that allows users to register, log in, post job listings, and apply for jobs. The project is built using **Next.js 14**, **TypeScript**, and **Tailwind CSS** for a modern, responsive, and scalable frontend. It connects to a backend API for handling job and application data.

## Project Overview

This Job Portal application provides the following functionalities:
- **User Registration & Authentication**: Allows applicants and companies to sign up and log in to access their respective functionalities.
- **Job Management**: Companies can post, update, and delete job listings. Jobs can be browsed and applied for by applicants.
- **Application Management**: Applicants can apply for jobs, and companies can view and update the status of applications.

## Technologies Used

- **Next.js 14**: A modern React-based framework for server-side rendering and building highly optimized web applications.
- **TypeScript**: Provides static typing for JavaScript to ensure type safety and reduce potential bugs.
- **Tailwind CSS**: A utility-first CSS framework to create responsive and customizable UI components quickly.

## Features

- **User Roles**: Supports two roles - Applicants and Companies.
- **Authentication**: JWT-based authentication for secure API requests.
- **Job Listings**: Companies can create and manage job postings.
- **Applications**: Applicants can apply for jobs, and companies can manage applications.

## API Endpoints

The backend API for the Job Portal is built with the following endpoints:

### Authentication

- **Register** (POST): `POST /api/auth/register`  
  Allows a user to register as either an applicant or a company.

- **Login** (POST): `POST /api/auth/login`  
  Logs in the user and returns a JWT token for authenticated actions.

### Jobs

- **Create Job** (POST): `POST /api/jobs/`  
  Allows a company to create a new job listing (Authentication required).

- **Get Jobs** (GET): `GET /api/jobs/`  
  Retrieves a list of all job listings.

- **Update Job** (PUT): `PUT /api/jobs/{jobId}`  
  Allows a company to update a job listing (Authentication required).

- **Delete Job** (DELETE): `DELETE /api/jobs/{jobId}`  
  Allows a company to delete a job listing (Authentication required).

### Applications

- **Apply for a Job** (POST): `POST /api/applications/`  
  Applicants can apply for a job by providing the job ID.

- **Get Applications** (GET): `GET /api/applications/`  
  Companies can view applications for their jobs.

- **Update Application Status** (PATCH): `PATCH /api/applications/{applicationId}`  
  Allows companies to update the status of an application, e.g., to shortlist or schedule interviews.

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal

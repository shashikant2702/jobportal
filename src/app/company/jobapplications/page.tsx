'use client';
import { useState, useEffect } from 'react';
import ApplicationDialog from '@/app/components/ApplicationDialog'; // Import the dialog component

interface Job {
  _id: string;
  title: string;
  postedBy: {
    _id: string;
    companyName: string;
  };
}

interface Application {
  _id: string;
  applicant: {
    _id: string;
    email: string;
  };
  shortlisted: boolean;
  interviewSchedule: string;
}

const JobSearch = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null); // State to handle the selected application
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to toggle dialog visibility

  // Fetching jobs from the backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Jobs/', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data); // Use the data directly as the response structure contains job objects
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Handle form submission to fetch applications based on selected job
  const handleSubmit = async () => {
    if (selectedJobId) {
      try {
        const response = await fetch(`http://localhost:3000/api/applications/${selectedJobId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data); // Set the applications data
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }
  };

  // Open dialog with the selected application details
  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  // Update application in state after modification from dialog
  const handleUpdateApplication = (updatedApplication: Application) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === updatedApplication._id ? updatedApplication : app))
    );
  };

  return (
    <div className="flex flex-col text-black items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search and Select Job</h1>

      {/* Selected Job and Submit Button */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <select
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a job</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title} - {job.postedBy.companyName}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition ml-4"
        >
          Submit
        </button>
      </div>

      {/* Applications List */}
      <div className="w-full max-w-md">
        {applications.map((application) => (
          <div key={application._id} className="p-4 bg-white rounded-lg shadow-lg mb-4">
            <p className="font-semibold text-lg">Applicant: {application.applicant.email}</p>
            <p className="text-gray-600">Shortlisted: {application.shortlisted ? 'Yes' : 'No'}</p>
            <p className="text-gray-600">Interview Schedule: {application.interviewSchedule || 'Not scheduled'}</p>
            <button
              onClick={() => handleViewApplication(application)} // Open dialog on button click
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Application
            </button>
          </div>
        ))}
      </div>

      {/* Render ApplicationDialog only when isDialogOpen is true */}
      {isDialogOpen && selectedApplication && (
        <ApplicationDialog
          applicationId={selectedApplication._id}
          jobTitle={jobs.find((job) => job._id === selectedJobId)?.title || ''}
          applicantEmail={selectedApplication.applicant.email}
          shortlisted={selectedApplication.shortlisted}
          interviewSchedule={selectedApplication.interviewSchedule}
          onClose={() => setIsDialogOpen(false)} // Close the dialog
          onUpdate={handleUpdateApplication} // Handle updating the application
        />
      )}
    </div>
  );
};

export default JobSearch;

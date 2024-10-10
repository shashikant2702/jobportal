'use client';
import { useEffect, useState } from 'react';

interface Application {
  _id: string;
  job: { title: string };
  applicant: { email: string };
  shortlisted: boolean;
  interviewSchedule: string;
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/applications/all', {
          method: 'GET',
          credentials: 'include', // To include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        console.log(response);
        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleClick = (id: string) => {
    console.log('Application ID:', id);
    // Handle the logic when the button is clicked with the application ID
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-black font-bold mb-8 text-center">Job Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {applications.map((application) => (
          <div
            key={application._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{application.job.title}</h2>
            <p className="text-gray-700">Applicant: {application.applicant.email}</p>
            <p className="text-gray-500">
              Shortlisted: {application.shortlisted ? 'Yes' : 'No'}
            </p>
            <p className="text-gray-500">
              Interview Schedule: {application.interviewSchedule || 'Not Scheduled'}
            </p>
            <button
              onClick={() => handleClick(application._id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Application
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;

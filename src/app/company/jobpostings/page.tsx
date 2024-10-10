'use client';
import { useEffect, useState } from 'react';
import ApplicationDialog from '@/app/components/ApplicationDialog'; // Import the dialog component

interface Application {
  _id: string;
  job: { title: string };
  applicant: { email: string };
  shortlisted: boolean;
  interviewSchedule: string;
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null); // Use proper typing for selectedApplication

  // Handle View Application button click
  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application); // Set the selected application
    setShowDialog(true); // Open the dialog
  };

  // Handle status update from the dialog box
  const handleApplicationUpdate = (updatedApplication: Application) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app._id === updatedApplication._id ? updatedApplication : app
      )
    );
  };

  // Fetch applications on component mount
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

        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

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
              onClick={() => handleViewApplication(application)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Application
            </button>
          </div>
        ))}
      </div>

      {/* Render the dialog if showDialog is true and selectedApplication is set */}
      {showDialog && selectedApplication && (
        <ApplicationDialog
          applicationId={selectedApplication._id}
          jobTitle={selectedApplication.job.title}
          applicantEmail={selectedApplication.applicant.email}
          shortlisted={selectedApplication.shortlisted}
          interviewSchedule={selectedApplication.interviewSchedule}
          onClose={() => setShowDialog(false)} // Close the dialog when needed
          onUpdate={handleApplicationUpdate} // Callback for updating the status
        />
      )}
    </div>
  );
};

export default ApplicationsPage;

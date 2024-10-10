'use client';
import { useState } from 'react';

interface ApplicationDialogProps {
  applicationId: string;
  jobTitle: string;
  applicantEmail: string;
  shortlisted: boolean;
  interviewSchedule: string;
  onClose: () => void;
  onUpdate: (updatedApplication: {
    _id: string;
    job: { title: string };
    applicant: { email: string };
    shortlisted: boolean;
    interviewSchedule: string;
  }) => void;
}

const ApplicationDialog = ({
  applicationId,
  jobTitle,
  applicantEmail,
  shortlisted,
  interviewSchedule,
  onClose,
  onUpdate,
}: ApplicationDialogProps) => {
  const [newShortlisted, setNewShortlisted] = useState(shortlisted);
  const [newInterviewSchedule, setNewInterviewSchedule] = useState(interviewSchedule);
  const [isSaving, setIsSaving] = useState(false); // Optional: add loading state

  const handleConfirm = async () => {
    setIsSaving(true); // Set saving state
    try {
      const response = await fetch(`http://localhost:3000/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shortlisted: newShortlisted,
          interviewSchedule: newInterviewSchedule,
        }),
        credentials: 'include', // To include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to update application');
      }

      const data = await response.json();
      console.log('Application updated:', data);

      // Call the onUpdate function to update the parent component's state
      onUpdate({
        _id: applicationId,
        job: { title: jobTitle },
        applicant: { email: applicantEmail },
        shortlisted: newShortlisted,
        interviewSchedule: newInterviewSchedule,
      });

      onClose(); // Close the dialog after a successful update
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setIsSaving(false); // Stop saving state
    }
  };

  return (
    <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4">{jobTitle} - Application Details</h2>
        <p className="mb-2 text-gray-600">Applicant Email: {applicantEmail}</p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Shortlisted:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={newShortlisted ? 'Yes' : 'No'}
            onChange={(e) => setNewShortlisted(e.target.value === 'Yes')}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Interview Schedule:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter meeting link"
            value={newInterviewSchedule}
            onChange={(e) => setNewInterviewSchedule(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleConfirm}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDialog;

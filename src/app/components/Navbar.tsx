'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const VerticalNavbar = ({ userRole }: { userRole: 'company' | 'applicant' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    // Logic to log the user out (e.g., clear cookies, tokens)
    router.push('/login');
  };

  return (
    <div className="relative">
      {/* Sidebar for large and medium screens */}
      <div className={`lg:w-1/4 md:w-1/4 fixed lg:h-screen md:h-screen bg-indigo-700 text-white ${isOpen ? 'block' : 'hidden'} lg:block md:block`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            {userRole === 'company' ? (
              <>
                <li>
                  <Link href="/company/jobcreate">
                    <div className="hover:text-indigo-400">List New Opening</div>
                  </Link>
                </li>
                <li>
                  <Link href="/company/jobpostings">
                    <div className="hover:text-indigo-400">View All Application</div>
                  </Link>
                </li>
                <li>
                  <Link href="/company/jobapplications">
                    <div className="hover:text-indigo-400">Manage Applications</div>
                  </Link>
                </li>
                <li>
                  <Link href="/company/profile">
                    <div className="hover:text-indigo-400">Profile</div>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/applicant/dashboard">
                    <div className="hover:text-indigo-400">Applicant Dashboard</div>
                  </Link>
                </li>
                <li>
                  <Link href="/applicant/job-search">
                    <div className="hover:text-indigo-400">Job Search</div>
                  </Link>
                </li>
                <li>
                  <Link href="/applicant/applications">
                    <div className="hover:text-indigo-400">My Applications</div>
                  </Link>
                </li>
                <li>
                  <Link href="/applicant/profile">
                    <div className="hover:text-indigo-400">Profile</div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <footer className="absolute bottom-0 p-4 w-full bg-indigo-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <span className="text-sm">User</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </footer>
      </div>

      {/* Mobile menu toggle for small screens */}
      <div className={`lg:hidden md:hidden fixed top-0 right-0 m-4 z-50`}>
        <button onClick={toggleNavbar} className="p-3 bg-indigo-700 text-white rounded-full">
          {isOpen ? (
            <span className="text-2xl">×</span>
          ) : (
            <span className="text-2xl">≡</span>
          )}
        </button>
      </div>

      {/* Mobile menu content */}
      <div
        className={`lg:hidden md:hidden fixed top-0 left-0 h-screen bg-indigo-700 text-white p-6 space-y-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          {userRole === 'company' ? (
            <>
              <li>
                <Link href="/company/dashboard">
                  <div className="block py-2 hover:text-indigo-400">Company Dashboard</div>
                </Link>
              </li>
              <li>
                <Link href="/company/job-postings">
                  <div className="block py-2 hover:text-indigo-400">Job Postings</div>
                </Link>
              </li>
              <li>
                <Link href="/company/applications">
                  <div className="block py-2 hover:text-indigo-400">Manage Applications</div>
                </Link>
              </li>
              <li>
                <Link href="/company/profile">
                  <div className="block py-2 hover:text-indigo-400">Profile</div>
                </Link>
              </li>
              <footer className="absolute bottom-0  w-full bg-indigo-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <span className="text-sm">User</span>
            </div>
            <button
              onClick={logout}
              className="px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </footer>
            </>
          ) : (
            <>
              <li>
                <Link href="/applicant/dashboard">
                  <div className="block py-2 hover:text-indigo-400">Applicant Dashboard</div>
                </Link>
              </li>
              <li>
                <Link href="/applicant/job-search">
                  <div className="block py-2 hover:text-indigo-400">Job Search</div>
                </Link>
              </li>
              <li>
                <Link href="/applicant/applications">
                  <div className="block py-2 hover:text-indigo-400">My Applications</div>
                </Link>
              </li>
              <li>
                <Link href="/applicant/profile">
                  <div className="block py-2 hover:text-indigo-400">Profile</div>
                </Link>
              </li>
              <footer className="absolute bottom-0 p-4 w-full bg-indigo-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <span className="text-sm">User</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </footer>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default VerticalNavbar;

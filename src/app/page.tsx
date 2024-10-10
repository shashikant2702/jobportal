"use client"
import { useEffect, useState } from 'react';
import VerticalNavbar from './components/Navbar';
import Link from 'next/link';
import useUserRole from './components/hooks/useUserRole';

export default function HomePage() {
  const { userRole, isAuthenticated } = useUserRole();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      {isAuthenticated ? (
        <div className="space-x-4">
          <Link href="/login">
            <div className="btn">Login</div>
          </Link>
          <Link href="/register">
            <div className="btn">Register</div>
          </Link>
        </div>
      ) : (
       <></>
        // <VerticalNavbar userRole={'company'} /> // Render navbar if logged in
      )}
    </div>
  );
}

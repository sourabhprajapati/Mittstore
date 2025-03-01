import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import StudentProfile from '../../components/StudentProfile/StudentProfile';
import SchoolProfile from '../../components/SchoolProfile/SchoolProfile';
import SeProfile from '../../components/seProfile/SeProfile';

const Profilepage = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();  
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab');  // Get tab parameter from URL

  if (!authContext) {
    return <div>Auth context is not available. Ensure AuthProvider wraps your app.</div>;
  }

  const { user } = authContext;

  const renderProfile = () => {
    switch (user?.role) {
      case 'student':
        return <StudentProfile initialTab={tab} />;
      case 'school':
        return <SchoolProfile initialTab={tab} />;
      case 'se':
        return <SeProfile initialTab={tab} />;
      default:
        return <div>Please log in or select a valid role.</div>;
    }
  };

  return (
    <div>
      <Header />
      {renderProfile()}
    </div>
  );
};

export default Profilepage;

import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import SeProfile from '../../components/seProfile/SeProfile';
import SchoolProfile from '../../components/SchoolProfile/SchoolProfile';
import StudentProfile from '../../components/StudentProfile/StudentProfile';

const Profilepage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Auth context is not available. Ensure AuthProvider wraps your app.</div>;
  }

  const { user } = authContext;

  const renderProfile = () => {
    switch (user?.role) {
      case 'student':
        return <StudentProfile />;
      case 'school':
        return < SchoolProfile />;
      case 'se':
        return <SeProfile />;
      default:
        return <div>Please log in or select a valid role.</div>;
    }
  };
//   //case 'se':
//   navigate('/se-profile');
//   break;
// case 'school':
//   navigate('/school-profile');
//   break;

  return (
    <div>
      <Header />
      {renderProfile()}
    </div>
  );
};

export default Profilepage;

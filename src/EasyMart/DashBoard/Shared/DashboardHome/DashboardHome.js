import React from 'react';
import useAuth from '../../../hooks/useAuth';
import AdminDashboardHome from '../../AdminDashBoard/AdminDashboardHome/AdminDashboardHome';
import UserDashboardHome from '../../UserDashboard/UserDashboardHome/UserDashboardHome';

const DashboardHome = () => {
      const {admin} = useAuth();
      return (
            <div>
                  { admin && <AdminDashboardHome/> }
                  { !admin && <UserDashboardHome/> }
            </div>
      );
};

export default DashboardHome;
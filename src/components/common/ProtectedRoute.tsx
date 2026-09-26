import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/types/auth.types';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If client attempts to access admin route, redirect to client dashboard
    if (user.role === 'CLIENT') {
      return <Navigate to="/client/dashboard" replace />;
    }
    // If admin attempts to access client route, redirect to admin dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

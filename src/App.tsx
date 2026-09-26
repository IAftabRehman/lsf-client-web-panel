import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { TacticalLoader } from '@/components/common/TacticalLoader';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ClientLayout } from '@/layouts/ClientLayout';
import { useAuthStore } from '@/store/useAuthStore';

// Mandate 6: Route Level Code-Splitting with React.lazy() for all 10 screens
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const ClientDashboard = lazy(() => import('@/pages/client/ClientDashboard'));
const InvoicesPaymentHub = lazy(() => import('@/pages/client/InvoicesPaymentHub'));
const BillingInvoiceGenerator = lazy(() => import('@/pages/admin/BillingInvoiceGenerator'));
const ActiveContractsESignature = lazy(() => import('@/pages/client/ActiveContractsESignature'));
const ContractMasterTermsSetup = lazy(() => import('@/pages/admin/ContractMasterTermsSetup'));
const PostOrdersGuardDeployment = lazy(() => import('@/pages/admin/PostOrdersGuardDeployment'));
const Client360CRM = lazy(() => import('@/pages/admin/Client360CRM'));
const ClientProfileSettings = lazy(() => import('@/pages/client/ClientProfileSettings'));

export default function App(): React.JSX.Element {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Suspense fallback={<TacticalLoader />}>
        <Routes>
          {/* Public Auth Gateway */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Role-Based Protected Layout & Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'OPERATIONS_DIRECTOR']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="deployments" element={<PostOrdersGuardDeployment />} />
            <Route path="crm" element={<Client360CRM />} />
            <Route path="contracts" element={<ContractMasterTermsSetup />} />
            <Route path="invoices" element={<BillingInvoiceGenerator />} />
            <Route path="post-orders" element={<PostOrdersGuardDeployment />} />
          </Route>

          {/* Client Role-Based Protected Layout & Routes */}
          <Route
            path="/client"
            element={
              <ProtectedRoute allowedRoles={['CLIENT']}>
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/client/dashboard" replace />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="contracts" element={<ActiveContractsESignature />} />
            <Route path="invoices" element={<InvoicesPaymentHub />} />
            <Route path="profile" element={<ClientProfileSettings />} />
          </Route>

          {/* Root Redirect based on authentication & role */}
          <Route
            path="/"
            element={
              isAuthenticated && user ? (
                user.role === 'ADMIN' ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/client/dashboard" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

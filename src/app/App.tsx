import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Loader } from './components/Loader';
import { Landing } from './pages/Landing';
import { StudentLogin } from './pages/StudentLogin';
import { StudentDashboard } from './pages/StudentDashboard';
import { InstitutionLogin } from './pages/InstitutionLogin';
import { InstitutionDashboard } from './pages/InstitutionDashboard';
import { UploadCertificate } from './pages/UploadCertificate';
import { VerifyPublic } from './pages/VerifyPublic';
import { Partners } from './pages/Partners';
import { Support } from './pages/Support';
import { Guide } from './pages/Guide';
import { AdminDashboard, ErrorPage } from './pages/AdminDashboard'; // AdminDashboard file exports both

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loader for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/verify" element={<VerifyPublic />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/support" element={<Support />} />
          <Route path="/guide" element={<Guide />} />
          
          {/* Student Routes */}
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          
          {/* Institution Routes */}
          <Route path="/login/institution" element={<InstitutionLogin />} />
          <Route path="/dashboard/institution" element={<InstitutionDashboard />} />
          <Route path="/upload" element={<UploadCertificate />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Fallback */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
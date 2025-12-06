import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BottomNav } from './components/layout/BottomNav';
import { LoginPage } from './pages/LoginPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ShareConfirmationPage } from './pages/ShareConfirmationPage';
import { ClientGalleryPage } from './pages/ClientGalleryPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="antialiased min-h-screen bg-bg-primary text-text-primary selection:bg-coral/30 selection:text-white">
        <div className="mx-auto max-w-md bg-bg-primary min-h-screen relative shadow-2xl">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/projects/:id/shared" element={<ShareConfirmationPage />} />
            <Route path="/shared/:token" element={<ClientGalleryPage />} />
            {/* Catch all for profile/others redirect to projects for prototype */}
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
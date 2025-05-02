import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Archives from './pages/Archives';
import AddArchive from './pages/AddArchive';
import Departments from './pages/Departments';
import NotFound from './pages/NotFound';
import { ArchiveProvider } from './context/ArchiveContext';
import { DepartmentProvider } from './context/DepartmentContext';
import './index.css';

function App() {
  return (
    <Router>
      <DepartmentProvider>
        <ArchiveProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/archives/add" element={<AddArchive />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ArchiveProvider>
      </DepartmentProvider>
    </Router>
  );
}

export default App;

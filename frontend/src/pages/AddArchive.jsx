// src/pages/AddArchive.jsx
import React from 'react';
import ArchiveForm from '../components/archives/ArchiveForm';

const AddArchive = () => {
  return (
    <div className="add-archive-page">
      <div className="page-header">
        <h1 className="page-title">إضافة أرشيف جديد</h1>
      </div>
      
      <ArchiveForm />
      
      <style jsx>{`
        .add-archive-page {
          padding: 20px;
        }
        
        .page-header {
          margin-bottom: 20px;
        }
        
        .page-title {
          color: var(--primary-color);
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default AddArchive;

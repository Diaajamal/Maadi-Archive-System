import React from 'react';
import { FaDownload, FaFileAlt, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { useArchives } from '../../context/ArchiveContext';
import { formatDate, truncateText } from '../../utils/helpers';
import { ARCHIVE_TYPES } from '../../utils/constants';

const ArchiveCard = ({ archive }) => {
  const { downloadFile } = useArchives();
  
  const handleDownload = async (fileName) => {
    try {
      await downloadFile(fileName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  
  const getBadgeColor = (type) => {
    return type === ARCHIVE_TYPES.INCOMING ? 'badge-info' : 'badge-warning';
  };
  
  return (
    <div className="archive-card">
      <div className="card">
        <div className="card-header">
          <div className="archive-header">
            <h3 className="archive-title">{archive.name}</h3>
            <span className={`badge ${getBadgeColor(archive.type)}`}>
              {archive.type}
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="archive-details">
            <div className="detail-item">
              <span className="detail-label">
                <FaFileAlt className="icon" /> رقم الأرشيف:
              </span>
              <span className="detail-value">{archive.archiveNumber}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">
                <FaFileAlt className="icon" /> رقم الملف:
              </span>
              <span className="detail-value">{archive.fileNumber}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">
                <FaCalendarAlt className="icon" /> التاريخ:
              </span>
              <span className="detail-value">{formatDate(archive.date)}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">
                <FaBuilding className="icon" /> الجهة:
              </span>
              <span className="detail-value">{archive.department}</span>
            </div>
          </div>
          
          {archive.description && (
            <div className="archive-description">
              <h4>الوصف:</h4>
              <p>{truncateText(archive.description, 150)}</p>
            </div>
          )}
          
          {archive.files && archive.files.length > 0 && (
            <div className="archive-files">
              <h4>الملفات:</h4>
              <ul className="files-list">
                {archive.files.map((file, index) => (
                  <li key={index} className="file-item">
                    <span className="file-name">{file}</span>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDownload(file)}
                    >
                      <FaDownload /> تحميل
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .archive-card {
          margin-bottom: 20px;
        }
        
        .archive-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .archive-title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .badge {
          padding: 5px 10px;
          border-radius: 4px;
        }
        
        .badge-info {
          background-color: var(--info-color);
        }
        
        .badge-warning {
          background-color: var(--warning-color);
        }
        
        .archive-details {
          margin-bottom: 15px;
        }
        
        .detail-item {
          display: flex;
          margin-bottom: 8px;
        }
        
        .detail-label {
          display: flex;
          align-items: center;
          font-weight: 500;
          margin-left: 10px;
          min-width: 120px;
        }
        
        .icon {
          margin-left: 5px;
        }
        
        .archive-description h4,
        .archive-files h4 {
          margin-top: 15px;
          margin-bottom: 8px;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .files-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .file-item:last-child {
          border-bottom: none;
        }
        
        .file-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 70%;
        }
        
        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          border-radius: 0.2rem;
        }
      `}</style>
    </div>
  );
};

export default ArchiveCard;

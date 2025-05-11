// src/components/archives/ArchiveList.jsx
import React from 'react';
import { FaDownload, FaCalendarAlt, FaBuilding, FaFolder } from 'react-icons/fa';
import { useArchives } from '../../context/ArchiveContext';

const ArchiveList = () => {
  const { archives, pagination, loading, error, changePage, downloadFile } = useArchives();

  const handleDownload = (filePath) => {
    // Extract filename from path
    const fileName = filePath.split('/').pop();
    downloadFile(fileName);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري تحميل الأرشيفات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (archives.length === 0) {
    return (
      <div className="no-records">
        <div className="alert alert-info">لا توجد أرشيفات للعرض</div>
      </div>
    );
  }

  return (
    <div className="archive-list">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>رقم الأرشيف</th>
              <th>العنوان</th>
              <th>النوع</th>
              <th>التاريخ</th>
              <th>الجهة</th>
              <th>نوع الجهة</th>
              <th>رقم الملف</th>
              <th>المرفقات</th>
            </tr>
          </thead>
          <tbody>
            {archives.map((archive) => (
              <tr key={archive.id}>
                <td>{archive.archiveNumber}</td>
                <td>{archive.name}</td>
                <td>
                  <span className={`badge ${archive.type === 'وارد' ? 'badge-incoming' : 'badge-outgoing'}`}>
                    {archive.type}
                  </span>
                </td>
                <td>
                  <span className="date-wrapper">
                    <FaCalendarAlt className="icon" />
                    {new Date(archive.date).toLocaleDateString('ar-EG')}
                  </span>
                </td>
                <td>
                  <span className="department-wrapper">
                    <FaBuilding className="icon" />
                    {(() => {
                      if (!archive.department) return '';
                      if (typeof archive.department === 'string') return archive.department;
                      if (typeof archive.department === 'object') return archive.department.name || '';
                      return '';
                    })()}
                  </span>
                </td>
                <td>
                  <span className={`badge ${archive.department?.isInternal ? 'badge-primary' : 'badge-secondary'}`}>
                    {(() => {
                      if (!archive.department) return 'خارجي';
                      if (typeof archive.department === 'object') {
                        return archive.department.isInternal ? 'داخلي' : 'خارجي';
                      }
                      return 'خارجي';
                    })()}
                  </span>
                </td>
                <td>
                  <span className="file-number-wrapper">
                    <FaFolder className="icon" />
                    {archive.fileNumber}
                  </span>
                </td>
                <td>
                  <div className="attachments">
                    {archive.filePaths && archive.filePaths.length > 0 ? (
                      archive.filePaths.map((filePath, index) => (
                        <button
                          key={index}
                          className="btn btn-sm btn-primary"
                          onClick={() => handleDownload(filePath)}
                          title="تحميل الملف"
                        >
                          <FaDownload className="icon" /> تحميل
                        </button>
                      ))
                    ) : (
                      <span className="no-attachments">لا توجد مرفقات</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => changePage(pagination.pageNo - 1)}
          disabled={pagination.pageNo === 0}
        >
          السابق
        </button>
        <span className="pagination-info">
          صفحة {pagination.pageNo + 1} من {pagination.totalPages}
        </span>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => changePage(pagination.pageNo + 1)}
          disabled={pagination.last}
        >
          التالي
        </button>
      </div>

      <style jsx>{`
        .archive-list {
          margin-top: 20px;
        }
        
        .badge {
          padding: 6px 10px;
          border-radius: 4px;
          font-weight: normal;
          font-size: 0.8rem;
        }
        
        .badge-incoming {
          background-color: var(--info-color);
          color: white;
        }
        
        .badge-outgoing {
          background-color: var(--warning-color);
          color: white;
        }
        
        .date-wrapper,
        .department-wrapper,
        .file-number-wrapper {
          display: flex;
          align-items: center;
        }
        
        .icon {
          margin-left: 5px;
          font-size: 0.9rem;
        }
        
        .attachments {
          display: flex;
          gap: 5px;
        }
        
        .no-attachments {
          color: #777;
          font-style: italic;
          font-size: 0.9rem;
        }
        
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          gap: 10px;
        }
        
        .pagination-info {
          margin: 0 10px;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .no-records {
          padding: 30px;
          text-align: center;
        }

        @media (forced-colors: active) {
          .badge {
            border: 1px solid CanvasText;
          }
          
          .badge-incoming {
            background-color: Canvas;
            color: CanvasText;
          }
          
          .badge-outgoing {
            background-color: Canvas;
            color: CanvasText;
          }
          
          .icon {
            color: CanvasText;
          }
          
          .no-attachments {
            color: CanvasText;
          }
          
          .pagination-container button {
            border: 1px solid CanvasText;
            color: CanvasText;
          }
          
          .pagination-container button:disabled {
            border-color: GrayText;
            color: GrayText;
          }
          
          .pagination-info {
            color: CanvasText;
          }
          
          .spinner {
            border-color: CanvasText;
            border-left-color: LinkText;
          }
          
          .no-records {
            color: CanvasText;
          }
        }
      `}</style>
    </div>
  );
};

export default ArchiveList;

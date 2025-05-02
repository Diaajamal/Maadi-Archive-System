import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import archiveService from '../services/archiveService';
import departmentService from '../services/departmentService';
import ArchiveList from '../components/archives/ArchiveList';
import ArchiveFilter from '../components/archives/ArchiveFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Archives = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [archives, setArchives] = useState([]);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: searchParams.get('type') || '',
    department: '',
    archiveNumber: '',
    fileNumber: ''
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentNames = await departmentService.getAllDepartments();
        setDepartments(departmentNames);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };
    
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setLoading(true);
        
        const response = await archiveService.getAllArchives(
          pagination.pageNo,
          pagination.pageSize,
          filters.startDate,
          filters.endDate,
          filters.type,
          filters.department,
          filters.archiveNumber ? parseInt(filters.archiveNumber) : null,
          filters.fileNumber ? parseInt(filters.fileNumber) : null
        );
        
        setArchives(response.content);
        setPagination({
          pageNo: response.pageNo,
          pageSize: response.pageSize,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          last: response.last
        });
        
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل البيانات');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchArchives();
  }, [pagination.pageNo, pagination.pageSize, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, pageNo: 0 })); // Reset to first page when filters change
    
    // Update URL search params to reflect filter type if present
    if (newFilters.type) {
      setSearchParams({ type: newFilters.type });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, pageNo: newPage }));
  };

  const handleDownload = async (fileName) => {
    try {
      await archiveService.downloadFile(fileName);
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  };

  return (
    <div className="archives-page">
      <div className="page-header">
        <h1 className="page-title">الأرشيفات</h1>
        <div className="page-actions">
          <a href="/archives/add" className="btn btn-primary">
            إضافة أرشيف جديد
          </a>
        </div>
      </div>
      
      <ArchiveFilter 
        departments={departments}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-container">
          <div className="alert alert-danger">{error}</div>
        </div>
      ) : (
        <ArchiveList 
          archives={archives}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDownload={handleDownload}
        />
      )}
      
      <style jsx>{`
        .archives-page {
          padding: 20px;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .page-title {
          margin: 0;
          color: var(--primary-color);
        }
        
        .error-container {
          margin-top: 20px;
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Archives;

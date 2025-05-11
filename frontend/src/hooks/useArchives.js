import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { archiveService } from '../services/archiveService';
import { useDepartments } from './useDepartments';

export const useArchives = () => {
  const [archives, setArchives] = useState([]);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { departments } = useDepartments();

  const fetchArchives = async (page = 0) => {
    try {
      setLoading(true);
      setError(null);
      const response = await archiveService.getArchives(page, pagination.pageSize);
      setArchives(response.content);
      setPagination({
        pageNo: response.pageable.pageNumber,
        pageSize: response.pageable.pageSize,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        last: response.last
      });
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء جلب الأرشيفات');
    } finally {
      setLoading(false);
    }
  };

  const changePage = (newPage) => {
    fetchArchives(newPage);
  };

  const downloadFile = async (fileName) => {
    try {
      await archiveService.downloadFile(fileName);
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء تحميل الملف');
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  return {
    archives,
    pagination,
    loading,
    error,
    changePage,
    downloadFile,
    departments: departments || []
  };
}; 
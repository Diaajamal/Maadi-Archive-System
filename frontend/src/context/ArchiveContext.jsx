// src/context/ArchiveContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import archiveService from '../services/archiveService';

const ArchiveContext = createContext();

export const useArchives = () => useContext(ArchiveContext);

export const ArchiveProvider = ({ children }) => {
  const [archives, setArchives] = useState([]);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: '',
    department: '',
    archiveNumber: '',
    fileNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArchives = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
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
  }, [pagination.pageNo, pagination.pageSize, filters]);

  const addArchive = async (archiveData) => {
    try {
      setLoading(true);
      setError(null);
      
      await archiveService.addArchive(archiveData);
      
      // Refresh archives
      await fetchArchives();
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('حدث خطأ أثناء إضافة الأرشيف');
      setLoading(false);
      console.error(err);
      return false;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, pageNo: 0 })); // Reset to first page when filters change
  };

  const changePage = (newPage) => {
    setPagination(prev => ({ ...prev, pageNo: newPage }));
  };

  const downloadFile = async (fileName) => {
    try {
      await archiveService.downloadFile(fileName);
      return true;
    } catch (err) {
      setError('حدث خطأ أثناء تحميل الملف');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  return (
    <ArchiveContext.Provider
      value={{
        archives,
        pagination,
        loading,
        error,
        filters,
        updateFilters,
        changePage,
        addArchive,
        downloadFile,
        refreshArchives: fetchArchives
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

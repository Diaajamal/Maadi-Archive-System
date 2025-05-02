// src/context/DepartmentContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import departmentService from '../services/departmentService';

const DepartmentContext = createContext();

export const useDepartments = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const departmentNames = await departmentService.getAllDepartments();
      setDepartments(departmentNames);
      
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ أثناء تحميل الأقسام');
      setLoading(false);
      console.error(err);
    }
  };

  const addDepartment = async (departmentName) => {
    try {
      setLoading(true);
      setError(null);
      
      await departmentService.addDepartment(departmentName);
      
      // Refresh departments
      await fetchDepartments();
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('حدث خطأ أثناء إضافة الجهة');
      setLoading(false);
      console.error(err);
      return false;
    }
  };

  const deleteDepartment = async (departmentName) => {
    try {
      setLoading(true);
      setError(null);
      
      await departmentService.deleteDepartment(departmentName);
      
      // Refresh departments
      await fetchDepartments();
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('حدث خطأ أثناء حذف الجهة');
      setLoading(false);
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        loading,
        error,
        addDepartment,
        deleteDepartment,
        refreshDepartments: fetchDepartments
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

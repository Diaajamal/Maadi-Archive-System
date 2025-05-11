// src/services/departmentService.js
import api from '../utils/api';

const departmentService = {
  getAllDepartments: async (isInternal = null) => {
    try {
      const url = isInternal !== null 
        ? `/api/v1/department/departments?isInternal=${isInternal}`
        : '/api/v1/department/departments';
      console.log('Fetching departments from:', url);
      const response = await api.get(url);
      console.log('Department response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },

  addDepartment: async (departmentName, isInternal = false) => {
    try {
      console.log('Service adding department:', departmentName, 'isInternal:', isInternal);
      const response = await api.post(`/api/v1/department/add?departmentName=${encodeURIComponent(departmentName)}&isInternal=${isInternal}`);
      console.log('Add department response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding department:', error);
      throw error;
    }
  },

  deleteDepartment: async (departmentName) => {
    try {
      const response = await api.delete(`/api/v1/department/delete?departmentName=${encodeURIComponent(departmentName)}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  },

  getDepartment: async (departmentName) => {
    try {
      const response = await api.get(`/api/v1/department/getDepartment?departmentName=${encodeURIComponent(departmentName)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching department:', error);
      throw error;
    }
  }
};

export default departmentService;

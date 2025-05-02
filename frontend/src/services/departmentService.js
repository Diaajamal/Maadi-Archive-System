// src/services/departmentService.js
import api from '../utils/api';

const departmentService = {
  getAllDepartments: async () => {
    try {
      const response = await api.get('/api/v1/department/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },
  
  addDepartment: async (departmentName) => {
    try {
      const response = await api.post(`/api/v1/department/add?departmentName=${encodeURIComponent(departmentName)}`);
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

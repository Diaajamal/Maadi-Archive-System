// src/services/archiveService.js
import api from '../utils/api';

const archiveService = {
  getAllArchives: async (page = 0, size = 10, startDate = '', endDate = '', type = '', department = '', archiveNumber = null, fileNumber = null) => {
    try {
      let url = `/api/v1/archive/all?page=${page}&size=${size}`;
      
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;
      if (type) url += `&type=${type}`;
      if (department) url += `&department=${department}`;
      if (archiveNumber) url += `&archiveNumber=${archiveNumber}`;
      if (fileNumber) url += `&fileNumber=${fileNumber}`;
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching archives:', error);
      throw error;
    }
  },
  
  addArchive: async (archiveData) => {
    try {
      // Create FormData object for file uploads
      const formData = new FormData();
      
      // Add all archive data to FormData
      formData.append('name', archiveData.name);
      formData.append('description', archiveData.description || 'لا يوجد');
      formData.append('type', archiveData.type);
      formData.append('department', archiveData.department);
      formData.append('archiveNumber', archiveData.archiveNumber || 0);
      formData.append('fileNumber', archiveData.fileNumber || 0);
      formData.append('date', archiveData.date);
      
      // Add files if present
      if (archiveData.files && archiveData.files.length) {
        archiveData.files.forEach(file => {
          formData.append('files', file);
        });
      }
      
      const response = await api.post('/api/v1/archive/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error adding archive:', error);
      throw error;
    }
  },
  
  downloadFile: async (fileName) => {
    try {
      const response = await api.get(`/api/v1/archive/download?fileName=${encodeURIComponent(fileName)}`, {
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      
      // Append to html page
      document.body.appendChild(link);
      
      // Start download
      link.click();
      
      // Clean up and remove the link
      link.parentNode.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
};

export default archiveService;

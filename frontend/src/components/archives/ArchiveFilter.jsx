// src/components/archives/ArchiveFilter.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { useArchives } from '../../context/ArchiveContext';
import { useDepartments } from '../../context/DepartmentContext';

const ArchiveFilter = () => {
  const { filters, updateFilters } = useArchives();
  const { departments } = useDepartments();
  
  const [localFilters, setLocalFilters] = useState({
    startDate: '',
    endDate: '',
    type: '',
    department: '',
    archiveNumber: '',
    fileNumber: ''
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Initialize local filters with context filters on mount
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters(localFilters);
  };
  
  const clearFilters = () => {
    const emptyFilters = {
      startDate: '',
      endDate: '',
      type: '',
      department: '',
      archiveNumber: '',
      fileNumber: ''
    };
    setLocalFilters(emptyFilters);
    updateFilters(emptyFilters);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`filter-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="filter-header">
        <h3>
          <FaFilter className="icon" /> تصفية الأرشيفات
        </h3>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary toggle-btn"
          onClick={toggleExpand}
        >
          {isExpanded ? 'إغلاق' : 'عرض خيارات التصفية'}
        </button>
      </div>
      
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <div className="filter-grid">
            <div className="form-group">
              <label htmlFor="type">نوع الأرشيف</label>
              <select
                id="type"
                name="type"
                className="form-control"
                value={localFilters.type}
                onChange={handleChange}
              >
                <option value="">الكل</option>
                <option value="وارد">وارد</option>
                <option value="صادر">صادر</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="department">الجهة</label>
              <select
                id="department"
                name="department"
                className="form-control"
                value={localFilters.department}
                onChange={handleChange}
              >
                <option value="">الكل</option>
                {departments.map((dept, index) => (
                  <option key={index} value={typeof dept === 'object' ? dept.name : dept}>
                    {typeof dept === 'object' ? dept.name : dept}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="startDate">من تاريخ</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="form-control"
                value={localFilters.startDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">إلى تاريخ</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="form-control"
                value={localFilters.endDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="archiveNumber">رقم الأرشيف</label>
              <input
                type="number"
                id="archiveNumber"
                name="archiveNumber"
                className="form-control"
                value={localFilters.archiveNumber}
                onChange={handleChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fileNumber">رقم الملف</label>
              <input
                type="number"
                id="fileNumber"
                name="fileNumber"
                className="form-control"
                value={localFilters.fileNumber}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          
          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">
              <FaSearch className="icon" /> بحث
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearFilters}
            >
              <FaTimes className="icon" /> مسح
            </button>
          </div>
        </form>
      )}
      
      <style jsx>{`
        .filter-container {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 15px;
          margin-bottom: 20px;
        }
        
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .filter-header h3 {
          margin: 0;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
        }
        
        .filter-header .icon {
          margin-left: 8px;
          color: var(--primary-color);
        }
        
        .toggle-btn {
          padding: 5px 10px;
          font-size: 0.9rem;
        }
        
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .filter-actions {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
        }
        
        .filter-actions .btn {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        @media (max-width: 768px) {
          .filter-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (forced-colors: active) {
          .filter-container {
            border: 1px solid CanvasText;
          }
          
          .filter-header .icon {
            forced-color-adjust: none;
          }
          
          .btn {
            border: 1px solid CanvasText;
          }
        }
      `}</style>
    </div>
  );
};

export default ArchiveFilter;

// src/pages/Departments.jsx
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaBuilding } from 'react-icons/fa';
import { useDepartments } from '../context/DepartmentContext';
import { ERROR_MESSAGES } from '../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Departments = () => {
  const { departments, loading, error, addDepartment, deleteDepartment } = useDepartments();
  
  const [newDepartment, setNewDepartment] = useState('');
  const [isInternal, setIsInternal] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newDepartment.trim()) {
      setFormError('يرجى إدخال اسم الجهة');
      return;
    }
    
    if (Array.isArray(departments) && departments.some(dept => dept.name === newDepartment.trim())) {
      setFormError(ERROR_MESSAGES.DEPARTMENT_EXISTS);
      return;
    }

    if (!isInternal) {
      setFormError('يرجى اختيار نوع الجهة');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormError('');
      
      const success = await addDepartment(newDepartment.trim(), isInternal === 'true');
      
      if (success) {
        setNewDepartment('');
        setIsInternal('');
      } else {
        setFormError(ERROR_MESSAGES.GENERAL);
      }
    } catch (err) {
      setFormError(ERROR_MESSAGES.GENERAL);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async (departmentName) => {
    if (window.confirm(`هل أنت متأكد من حذف الجهة "${departmentName}"؟`)) {
      try {
        await deleteDepartment(departmentName);
      } catch (err) {
        console.error('Error deleting department:', err);
      }
    }
  };
  
  if (loading && departments.length === 0) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="departments-page">
      <div className="page-header">
        <h1 className="page-title">الأقسام</h1>
      </div>
      
      <div className="content-grid">
        <div className="department-form-card">
          <div className="card">
            <div className="card-header">
              <h2>إضافة جهة جديدة</h2>
            </div>
            <div className="card-body">
              {formError && (
                <div className="alert alert-danger">{formError}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="departmentName">اسم الجهة</label>
                  <input
                    type="text"
                    id="departmentName"
                    className="form-control"
                    value={newDepartment}
                    onChange={(e) => {
                      setNewDepartment(e.target.value);
                      setFormError('');
                    }}
                    placeholder="أدخل اسم الجهة"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="isInternal">نوع الجهة *</label>
                  <select
                    id="isInternal"
                    className="form-control"
                    value={isInternal}
                    onChange={(e) => {
                      setIsInternal(e.target.value);
                      setFormError('');
                    }}
                    disabled={isSubmitting}
                  >
                    <option value="">اختر نوع الجهة</option>
                    <option value="true">داخلي</option>
                    <option value="false">خارجي</option>
                  </select>
                  <small className="form-text text-muted">داخلي/خارجي</small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || loading}
                >
                  <FaPlus className="icon" /> إضافة
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="departments-list-card">
          <div className="card">
            <div className="card-header">
              <h2>قائمة الجهات</h2>
            </div>
            <div className="card-body">
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : departments.length === 0 ? (
                <div className="no-departments">
                  <div className="empty-icon">
                    <FaBuilding />
                  </div>
                  <p>لا توجد جهات مضافة</p>
                </div>
              ) : (
                <ul className="departments-list">
                  {departments.map((dept) => (
                    <li key={dept.name} className="department-item">
                      <div className="department-info">
                        <span className="department-name">{dept.name}</span>
                        <span className={`badge ${dept.isInternal ? 'badge-primary' : 'badge-secondary'}`}>
                          {dept.isInternal ? 'داخلي' : 'خارجي'}
                        </span>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(dept.name)}
                        disabled={loading}
                      >
                        <FaTrash /> حذف
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .departments-page {
          padding: 20px;
        }
        
        .page-header {
          margin-bottom: 20px;
        }
        
        .page-title {
          color: var(--primary-color);
          margin: 0;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 20px;
        }
        
        .icon {
          margin-left: 5px;
        }
        
        .no-departments {
          text-align: center;
          padding: 30px;
          color: #6c757d;
        }
        
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 10px;
          color: var(--border-color);
        }
        
        .departments-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .department-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .department-item:last-child {
          border-bottom: none;
        }
        
        .department-name {
          font-weight: 500;
        }
        
        .department-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .badge {
          padding: 0.25em 0.6em;
          font-size: 0.75em;
          font-weight: 500;
          border-radius: 0.25rem;
        }
        
        .badge-primary {
          background-color: var(--primary-color);
          color: white;
        }
        
        .badge-secondary {
          background-color: #6c757d;
          color: white;
        }
        
        .form-text {
          font-size: 0.875em;
          color: #6c757d;
          margin-top: 0.25rem;
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Departments;

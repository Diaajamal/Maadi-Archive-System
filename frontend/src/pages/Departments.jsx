// src/pages/Departments.jsx
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaBuilding } from 'react-icons/fa';
import { useDepartments } from '../context/DepartmentContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Departments = () => {
  const { departments, loading, error, addDepartment, deleteDepartment } = useDepartments();
  
  const [newDepartment, setNewDepartment] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newDepartment.trim()) {
      setFormError('يرجى إدخال اسم الجهة');
      return;
    }
    
    if (departments.includes(newDepartment.trim())) {
      setFormError('هذة الجهة موجودة بالفعل');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormError('');
      
      const success = await addDepartment(newDepartment.trim());
      
      if (success) {
        setNewDepartment('');
      } else {
        setFormError('حدث خطأ أثناء إضافة الجهة');
      }
    } catch (err) {
      setFormError('حدث خطأ أثناء إضافة الجهة');
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
                  {departments.map((dept, index) => (
                    <li key={index} className="department-item">
                      <span className="department-name">{dept}</span>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(dept)}
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

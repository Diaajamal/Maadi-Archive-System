import React from 'react';
import { FaTrash, FaBuilding } from 'react-icons/fa';
import { useDepartments } from '../../context/DepartmentContext';

const DepartmentList = () => {
  const { departments, loading, error, deleteDepartment } = useDepartments();
  
  const handleDelete = async (departmentName) => {
    if (window.confirm(`هل أنت متأكد من حذف الجهة "${departmentName}"؟`)) {
      try {
        await deleteDepartment(departmentName);
      } catch (err) {
        console.error('Error deleting department:', err);
      }
    }
  };
  
  return (
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
      
      <style jsx>{`
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
        
        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          border-radius: 0.2rem;
        }
      `}</style>
    </div>
  );
};

export default DepartmentList;

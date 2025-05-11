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
      
      <style>{`
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

        @media (forced-colors: active) {
          .no-departments {
            color: CanvasText;
          }
          
          .empty-icon {
            color: CanvasText;
          }
          
          .department-item {
            border-bottom: 1px solid CanvasText;
          }
          
          .department-name {
            color: CanvasText;
          }
          
          .badge {
            border: 1px solid CanvasText;
          }
          
          .badge-primary {
            background-color: Canvas;
            color: CanvasText;
          }
          
          .badge-secondary {
            background-color: Canvas;
            color: CanvasText;
          }
          
          .btn-sm {
            border: 1px solid CanvasText;
            color: CanvasText;
          }
          
          .btn-sm:hover {
            color: LinkText;
          }
        }
      `}</style>
    </div>
  );
};

export default DepartmentList;

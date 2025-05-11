import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDepartments } from '../../context/DepartmentContext';
import { ERROR_MESSAGES } from '../../utils/constants';

const DepartmentForm = () => {
  const { addDepartment, departments, loading } = useDepartments();
  
  const [formData, setFormData] = useState({
    name: '',
    isInternal: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setFormError('يرجى إدخال اسم الجهة');
      return;
    }
    
    if (departments.some(dept => dept.name === formData.name.trim())) {
      setFormError(ERROR_MESSAGES.DEPARTMENT_EXISTS);
      return;
    }

    if (!formData.isInternal) {
      setFormError('يرجى اختيار نوع الجهة');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormError('');
      
      const success = await addDepartment(formData.name.trim(), formData.isInternal === 'true');
      
      if (success) {
        setFormData({ name: '', isInternal: '' });
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
  
  return (
    <div className="department-form-card">
      <div className="card">
        <div className="card-header">
          <h2> إضافة جهة جديدة </h2>
        </div>
        <div className="card-body">
          {formError && (
            <div className="alert alert-danger">{formError}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">إسم الجهة</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="إدخل اسم الجهة"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isInternal">نوع الجهة *</label>
              <select
                id="isInternal"
                name="isInternal"
                className="form-control"
                value={formData.isInternal}
                onChange={handleChange}
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
      
      <style>{`
        .icon {
          margin-left: 5px;
        }

        @media (forced-colors: active) {
          .department-form-card {
            border: 1px solid CanvasText;
          }
          
          .card-header {
            border-bottom: 1px solid CanvasText;
          }
          
          .card-header h2 {
            color: CanvasText;
          }
          
          .form-group label {
            color: CanvasText;
          }
          
          .form-control {
            border: 1px solid CanvasText;
            color: CanvasText;
          }
          
          .form-text {
            color: CanvasText;
          }
          
          .btn-primary {
            border: 1px solid CanvasText;
            color: CanvasText;
          }
          
          .btn-primary:hover {
            color: LinkText;
          }
          
          .alert-danger {
            border: 1px solid CanvasText;
            color: CanvasText;
          }
        }
      `}</style>
    </div>
  );
};

export default DepartmentForm;

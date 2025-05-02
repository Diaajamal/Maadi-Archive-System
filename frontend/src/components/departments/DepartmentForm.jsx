import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDepartments } from '../../context/DepartmentContext';
import { ERROR_MESSAGES } from '../../utils/constants';

const DepartmentForm = () => {
  const { addDepartment, departments, loading } = useDepartments();
  
  const [departmentName, setDepartmentName] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!departmentName.trim()) {
      setFormError(ERROR_MESSAGES.FIELD_REQUIRED);
      return;
    }
    
    if (departments.includes(departmentName.trim())) {
      setFormError(ERROR_MESSAGES.DEPARTMENT_EXISTS);
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormError('');
      
      const success = await addDepartment(departmentName.trim());
      
      if (success) {
        setDepartmentName('');
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
              <label htmlFor="departmentName">إسم الجهة</label>
              <input
                type="text"
                id="departmentName"
                className="form-control"
                value={departmentName}
                onChange={(e) => {
                  setDepartmentName(e.target.value);
                  setFormError('');
                }}
                placeholder="إدخل اسم الجهة"
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
      
      <style jsx>{`
        .icon {
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};

export default DepartmentForm;

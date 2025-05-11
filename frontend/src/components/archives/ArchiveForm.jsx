// src/components/archives/ArchiveForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaUpload } from 'react-icons/fa';
import { useArchives } from '../../context/ArchiveContext';
import { useDepartments } from '../../context/DepartmentContext';
import FileUploader from './FileUploader';

const ArchiveForm = () => {
  const navigate = useNavigate();
  const { addArchive, loading } = useArchives();
  const { departments } = useDepartments();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'وارد', // Default value
    department: '',
    archiveNumber: '',
    fileNumber: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    files: []
  });
  
  const [isInternal, setIsInternal] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (Array.isArray(departments)) {
      const filtered = departments.filter(dept => {
        if (isInternal === '') return true;
        const isInternalBool = isInternal === 'true';
        return dept.isInternal === isInternalBool;
      });
      setFilteredDepartments(filtered);
    }
  }, [departments, isInternal]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleFilesChange = (files) => {
    setFormData(prev => ({ ...prev, files }));
    // Clear error when files are updated
    if (errors.files) {
      setErrors(prev => ({ ...prev, files: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال عنوان الأرشيف';
    }
    
    if (!formData.type) {
      newErrors.type = 'يرجى اختيار نوع الأرشيف';
    }
    
    if (!formData.department) {
      newErrors.department = 'يرجى اختيار الجهة';
    }
    
    if (!formData.date) {
      newErrors.date = 'يرجى إدخال التاريخ';
    }
    
    if (formData.archiveNumber && parseInt(formData.archiveNumber) < 0) {
      newErrors.archiveNumber = 'يجب أن يكون رقم الأرشيف صحيح موجب';
    }
    
    if (formData.fileNumber && parseInt(formData.fileNumber) < 0) {
      newErrors.fileNumber = 'يجب أن يكون رقم الملف صحيح موجب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      const success = await addArchive(formData);
      
      if (success) {
        navigate('/archives');
      } else {
        setSubmitError('حدث خطأ أثناء إضافة الأرشيف. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('حدث خطأ أثناء إضافة الأرشيف. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="archive-form-container">
      <div className="card">
        <div className="card-header">
          <h2>إضافة أرشيف جديد</h2>
        </div>
        <div className="card-body">
          {submitError && (
            <div className="alert alert-danger">{submitError}</div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">عنوان الأرشيف *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="type">نوع الأرشيف *</label>
                <select
                  id="type"
                  name="type"
                  className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">اختر نوع الأرشيف</option>
                  <option value="وارد">وارد</option>
                  <option value="صادر">صادر</option>
                </select>
                {errors.type && <div className="error-message">{errors.type}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="isInternal">نوع الجهة *</label>
                <select
                  id="isInternal"
                  className="form-control"
                  value={isInternal}
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log('Selected isInternal:', value);
                    setIsInternal(value);
                    setFormData(prev => ({ ...prev, department: '' }));
                  }}
                >
                  <option value="">اختر نوع الجهة</option>
                  <option value="true">داخلي</option>
                  <option value="false">خارجي</option>
                </select>
                <small className="form-text text-muted">داخلي/خارجي</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="department">الجهة *</label>
                <select
                  id="department"
                  name="department"
                  className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">اختر الجهة</option>
                  {filteredDepartments.map((dept) => (
                    <option key={dept.name} value={dept.name}>
                      {dept.name} ({dept.isInternal ? 'داخلي' : 'خارجي'})
                    </option>
                  ))}
                </select>
                {errors.department && <div className="error-message">{errors.department}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="date">التاريخ *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <div className="error-message">{errors.date}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="archiveNumber">رقم الأرشيف</label>
                <input
                  type="number"
                  id="archiveNumber"
                  name="archiveNumber"
                  className={`form-control ${errors.archiveNumber ? 'is-invalid' : ''}`}
                  value={formData.archiveNumber}
                  onChange={handleChange}
                  min="0"
                />
                {errors.archiveNumber && <div className="error-message">{errors.archiveNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="fileNumber">رقم الملف</label>
                <input
                  type="number"
                  id="fileNumber"
                  name="fileNumber"
                  className={`form-control ${errors.fileNumber ? 'is-invalid' : ''}`}
                  value={formData.fileNumber}
                  onChange={handleChange}
                  min="0"
                />
                {errors.fileNumber && <div className="error-message">{errors.fileNumber}</div>}
              </div>
              
              <div className="form-group description-field">
                <label htmlFor="description">الوصف</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
            </div>
            
            <div className="form-group">
              <label>المرفقات</label>
              <FileUploader onFilesChange={handleFilesChange} />
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || loading}
              >
                <FaSave className="icon" /> حفظ الأرشيف
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/archives')}
                disabled={isSubmitting || loading}
              >
                <FaTimes className="icon" /> إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .archive-form-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .description-field {
          grid-column: span 2;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          margin-top: 20px;
        }
        
        .form-actions .btn {
          display: flex;
          align-items: center;
        }
        
        .form-actions .icon {
          margin-left: 5px;
        }
        
        .is-invalid {
          border-color: var(--danger-color);
        }
        
        .error-message {
          color: var(--danger-color);
          font-size: 0.8rem;
          margin-top: 5px;
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .description-field {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ArchiveForm;

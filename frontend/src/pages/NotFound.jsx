import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <h1>404</h1>
        <h2>الصفحة غير موجودة</h2>
        <p>عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
        <Link to="/" className="btn btn-primary">
          <FaHome className="icon" /> العودة للرئيسية
        </Link>
      </div>
      
      <style jsx>{`
        .not-found-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          text-align: center;
          padding: 20px;
        }
        
        .error-container {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }
        
        .error-icon {
          font-size: 5rem;
          color: var(--warning-color);
          margin-bottom: 20px;
        }
        
        h1 {
          font-size: 5rem;
          margin: 0;
          color: var(--primary-color);
        }
        
        h2 {
          margin: 10px 0 20px;
          color: var(--dark-color);
        }
        
        p {
          margin-bottom: 30px;
          color: var(--text-color);
        }
        
        .icon {
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
};

export default NotFound;

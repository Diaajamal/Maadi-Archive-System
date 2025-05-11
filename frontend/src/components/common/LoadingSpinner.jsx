import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>جاري التحميل...</p>
      <style jsx>{`
        .spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: var(--primary-color);
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (forced-colors: active) {
          .spinner {
            border-color: CanvasText;
            border-top-color: LinkText;
          }
          
          .spinner-container p {
            color: CanvasText;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

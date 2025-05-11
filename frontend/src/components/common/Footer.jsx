import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>جميع الحقوق محفوظة &copy; {currentYear} - نظام أرشيف مستشفى القوات المسلحة بالمعادى</p>
      </div>
      <style jsx>{`
        .footer {
          background-color: var(--dark-color);
          color: #fff;
          padding: 15px 0;
          text-align: center;
          margin-top: auto;
        }
        
        .footer p {
          margin: 0;
        }

        @media (forced-colors: active) {
          .footer {
            background-color: Canvas;
            color: CanvasText;
            border: 1px solid CanvasText;
          }
          
          .footer p {
            color: CanvasText;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

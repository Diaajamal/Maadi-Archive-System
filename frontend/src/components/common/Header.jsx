import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="مستشفى القوات المسلحة بالمعادى" className="logo" />
            <div className="logo-text">
              <h1>منظومة أرشيف مستشفى القوات المسلحة بالمعادى فرع نظم المعلومات</h1>
            </div>
          </div>
          {/* <nav className="main-nav">
            <ul>
              <li>
                <Link to="/">الرئيسية</Link>
              </li>
              <li>
                <Link to="/archives">الأرشيف</Link>
              </li>
              <li>
                <Link to="/archives/add">إضافة أرشيف</Link>
              </li>
              <li>
                <Link to="/departments">الأقسام</Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
      <style jsx>{`
        .header {
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          padding: 10px 0;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo {
          width: 70px;
          height: auto;
          margin-left: 15px;
        }
        
        .logo-text h1 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--primary-color);
          margin: 0;
        }
        
        .main-nav ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .main-nav li {
          margin-right: 20px;
        }
        
        .main-nav li:last-child {
          margin-right: 0;
        }
        
        .main-nav a {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: color 0.3s;
        }
        
        .main-nav a:hover {
          color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
          }
          
          .logo-container {
            margin-bottom: 15px;
          }
          
          .main-nav ul {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .main-nav li {
            margin: 5px 10px;
          }
        }

        @media (forced-colors: active) {
          .header {
            border: 1px solid CanvasText;
            background-color: Canvas;
          }
          
          .logo-text h1 {
            color: CanvasText;
          }
          
          .main-nav a {
            color: CanvasText;
          }
          
          .main-nav a:hover {
            color: LinkText;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaArchive, FaPlus, FaBuilding } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>لوحة التحكم</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaHome className="nav-icon" />
              <span>الرئيسية</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/archives" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaArchive className="nav-icon" />
              <span>الأرشيف</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/archives/add" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaPlus className="nav-icon" />
              <span>إضافة أرشيف</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/departments" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaBuilding className="nav-icon" />
              <span>الجهات</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .sidebar {
          width: 250px;
          background-color: var(--dark-color);
          color: #fff;
          height: 100%;
        }
        
        .sidebar-header {
          padding: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-header h3 {
          margin: 0;
          font-size: 1.2rem;
          text-align: center;
        }
        
        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .sidebar-nav li {
          margin: 0;
        }
        
        .sidebar-nav a {
          display: flex;
          align-items: center;
          padding: 15px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s;
        }
        
        .sidebar-nav a:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .sidebar-nav a.active {
          background-color: var(--primary-color);
          color: #fff;
        }
        
        .nav-icon {
          margin-left: 10px;
          font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
          }
          
          .sidebar-nav {
            display: flex;
            overflow-x: auto;
          }
          
          .sidebar-nav ul {
            display: flex;
            width: 100%;
          }
          
          .sidebar-nav li {
            flex: 1;
          }
          
          .sidebar-nav a {
            justify-content: center;
            padding: 10px;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;

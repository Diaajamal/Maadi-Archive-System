import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArchive, FaBuilding, FaFileImport, FaFileExport } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';
import archiveService from '../services/archiveService';
import departmentService from '../services/departmentService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalArchives: 0,
    totalDepartments: 0,
    incomingArchives: 0,
    outgoingArchives: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get all archives to count them by type
        const archivesResponse = await archiveService.getAllArchives(0, 1000);
        const departments = await departmentService.getAllDepartments();
        
        // Count incoming and outgoing archives
        const incoming = archivesResponse.content.filter(archive => archive.type === 'وارد').length;
        const outgoing = archivesResponse.content.filter(archive => archive.type === 'صادر').length;
        
        setStats({
          totalArchives: archivesResponse.totalElements,
          totalDepartments: departments.length,
          incomingArchives: incoming,
          outgoingArchives: outgoing
        });
        
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل البيانات');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">لوحة التحكم</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaArchive />
          </div>
          <div className="stat-details">
            <h3>إجمالي الأرشيفات</h3>
            <p className="stat-number">{stats.totalArchives}</p>
            <Link to="/archives" className="stat-link">عرض الكل</Link>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon building-icon">
            <FaBuilding />
          </div>
          <div className="stat-details">
            <h3>الجهات</h3>
            <p className="stat-number">{stats.totalDepartments}</p>
            <Link to="/departments" className="stat-link">عرض الكل</Link>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon incoming-icon">
            <FaFileImport />
          </div>
          <div className="stat-details">
            <h3>أرشيفات واردة</h3>
            <p className="stat-number">{stats.incomingArchives}</p>
            <Link to="/archives?type=وارد" className="stat-link">عرض التفاصيل</Link>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon outgoing-icon">
            <FaFileExport />
          </div>
          <div className="stat-details">
            <h3>أرشيفات صادرة</h3>
            <p className="stat-number">{stats.outgoingArchives}</p>
            <Link to="/archives?type=صادر" className="stat-link">عرض التفاصيل</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .dashboard {
          padding: 20px;
        }
        
        .page-title {
          margin-bottom: 30px;
          color: var(--primary-color);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          overflow: hidden;
        }
        
        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          background-color: var(--primary-color);
          color: white;
          font-size: 2rem;
        }
        
        .building-icon {
          background-color: var(--secondary-color);
        }
        
        .incoming-icon {
          background-color: var(--info-color);
        }
        
        .outgoing-icon {
          background-color: var(--warning-color);
        }
        
        .stat-details {
          padding: 20px;
          flex: 1;
        }
        
        .stat-details h3 {
          margin: 0 0 10px 0;
          font-size: 1rem;
        }
        
        .stat-number {
          font-size: 1.8rem;
          font-weight: bold;
          margin: 0 0 10px 0;
        }
        
        .stat-link {
          color: var(--primary-color);
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .stat-link:hover {
          text-decoration: underline;
        }
        
        .recent-section {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        
        .recent-section h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.2rem;
          color: var(--dark-color);
        }
        
        .no-data {
          text-align: center;
          color: #777;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

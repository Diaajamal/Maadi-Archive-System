import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
      <Footer />
      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .main-container {
          display: flex;
          flex: 1;
        }
        
        .content {
          flex: 1;
          padding: 20px;
        }
        
        @media (max-width: 768px) {
          .main-container {
            flex-direction: column;
          }
        }

        @media (forced-colors: active) {
          .app-container {
            border: 1px solid CanvasText;
          }
          
          .content {
            border: 1px solid CanvasText;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;

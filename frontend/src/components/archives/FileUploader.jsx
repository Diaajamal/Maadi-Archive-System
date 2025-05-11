// src/components/archives/FileUploader.jsx
import React, { useState, useRef } from 'react';
import { FaUpload, FaFile, FaTrash } from 'react-icons/fa';

const FileUploader = ({ onFilesChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFilesChange([...selectedFiles, ...files]);
    
    // Reset the input value so the same file can be selected again if removed
    e.target.value = '';
  };
  
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...droppedFiles]);
      onFilesChange([...selectedFiles, ...droppedFiles]);
    }
  };
  
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <span className="file-type pdf">PDF</span>;
      case 'doc':
      case 'docx':
        return <span className="file-type doc">DOC</span>;
      case 'xls':
      case 'xlsx':
        return <span className="file-type xls">XLS</span>;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <span className="file-type img">IMG</span>;
      default:
        return <span className="file-type">FILE</span>;
    }
  };
  
  return (
    <div className="file-uploader">
      <div 
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="upload-icon">
          <FaUpload />
        </div>
        <p>اسحب الملفات هنا أو انقر للاختيار</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h4>الملفات المحددة ({selectedFiles.length})</h4>
          <ul className="file-list">
            {selectedFiles.map((file, index) => (
              <li key={index} className="file-item">
                <div className="file-info">
                  {getFileIcon(file.name)}
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => handleRemoveFile(index)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <style jsx>{`
        .file-uploader {
          margin-top: 10px;
        }
        
        .drop-zone {
          border: 2px dashed var(--border-color);
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        
        .drop-zone:hover {
          border-color: var(--primary-color);
        }
        
        .upload-icon {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 10px;
        }
        
        .selected-files {
          margin-top: 20px;
        }
        
        .selected-files h4 {
          margin-bottom: 10px;
          font-size: 1rem;
        }
        
        .file-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .file-info {
          display: flex;
          align-items: center;
        }
        
        .file-type {
          display: inline-block;
          padding: 3px 6px;
          border-radius: 3px;
          background-color: #e9ecef;
          color: #495057;
          font-size: 0.7rem;
          font-weight: bold;
          margin-left: 10px;
        }
        
        .file-type.pdf {
          background-color: #dc3545;
          color: white;
        }
        
        .file-type.doc {
          background-color: #007bff;
          color: white;
        }
        
        .file-type.xls {
          background-color: #28a745;
          color: white;
        }
        
        .file-type.img {
          background-color: #6610f2;
          color: white;
        }
        
        .file-name {
          margin-left: 10px;
          flex: 1;
        }
        
        .file-size {
          color: #6c757d;
          font-size: 0.8rem;
        }
        
        .btn-remove {
          background: none;
          border: none;
          color: var(--danger-color);
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-remove:hover {
          opacity: 0.8;
        }

        @media (forced-colors: active) {
          .drop-zone {
            border: 2px dashed CanvasText;
          }
          
          .drop-zone:hover {
            border-color: LinkText;
          }
          
          .upload-icon {
            color: CanvasText;
          }
          
          .selected-files h4 {
            color: CanvasText;
          }
          
          .file-item {
            border: 1px solid CanvasText;
          }
          
          .file-type {
            border: 1px solid CanvasText;
            background-color: Canvas;
            color: CanvasText;
          }
          
          .file-name {
            color: CanvasText;
          }
          
          .file-size {
            color: CanvasText;
          }
          
          .btn-remove {
            border: 1px solid CanvasText;
            color: CanvasText;
          }
          
          .btn-remove:hover {
            color: LinkText;
          }
        }
      `}</style>
    </div>
  );
};

export default FileUploader;

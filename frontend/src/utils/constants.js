// src/utils/constants.js

// Archive types
export const ARCHIVE_TYPES = {
  INCOMING: 'وارد',
  OUTGOING: 'صادر'
};

// File size limits
export const FILE_SIZE_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_TOTAL_SIZE: 20 * 1024 * 1024 // 20MB
};

// Allowed file types
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/zip',
  'application/x-rar-compressed'
];

// Pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100]
};

// Route paths
export const ROUTES = {
  HOME: '/',
  ARCHIVES: '/archives',
  ADD_ARCHIVE: '/archives/add',
  DEPARTMENTS: '/departments'
};

// API endpoints
export const API_ENDPOINTS = {
  ARCHIVES: '/api/v1/archive',
  DEPARTMENTS: '/api/v1/department'
};

// Error messages
export const ERROR_MESSAGES = {
  GENERAL: 'حدث خطأ، الرجاء المحاولة مرة أخرى',
  NETWORK: 'حدث خطأ في الاتصال بالخادم',
  FIELD_REQUIRED: 'هذا الحقل مطلوب',
  INVALID_FILE_TYPE: 'نوع الملف غير مدعوم',
  FILE_TOO_LARGE: 'حجم الملف كبير جداً',
  DEPARTMENT_EXISTS: 'هذه الجهة موجودة بالفعل'
};

// Success messages
export const SUCCESS_MESSAGES = {
  ARCHIVE_ADDED: 'تم إضافة الأرشيف بنجاح',
  DEPARTMENT_ADDED: 'تم إضافة الجهة بنجاح',
  DEPARTMENT_DELETED: 'تم حذف الجهة بنجاح',
  FILE_DOWNLOADED: 'تم تحميل الملف بنجاح'
};

// Colors
export const COLORS = {
  PRIMARY: 'var(--primary-color)',
  SECONDARY: 'var(--secondary-color)',
  DANGER: 'var(--danger-color)',
  SUCCESS: 'var(--success-color)',
  WARNING: 'var(--warning-color)',
  INFO: 'var(--info-color)'
};

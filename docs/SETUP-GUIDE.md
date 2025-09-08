# 📖 Complete Setup Guide

## 🎯 Overview
This guide will help you set up your complete Aromatic Impex business solution.

## 📋 Prerequisites
- Node.js 18+ installed
- Hostinger hosting account with MySQL
- Code editor (VS Code recommended)

## 🚀 Setup Steps

### 1. Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
cp .env.local.template .env.local
# Edit with your Hostinger credentials
```

### 3. Database Setup
1. Create MySQL database in Hostinger: `aromatic_impex_hr`
2. Import `database/schema.sql` via phpMyAdmin
3. Test: `npm run db:test`

### 4. Development
```bash
npm run dev
# Visit http://localhost:3000
```

## 🔧 Configuration

### Database (.env.local)
```env
DB_HOST=your_hostinger_mysql_hostname
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=aromatic_impex_hr
```

### EmailJS (Optional)
Set up at https://www.emailjs.com/ for automated emails.

## 🎯 Features
- Professional spice business website
- Employee time tracking system
- Variable pay calculation
- Automated email notifications
- Admin dashboard and reports

## 🔐 Security
- Change default admin password: admin123
- Use strong NEXTAUTH_SECRET
- Keep database credentials secure

## 📞 Support
- Database issues: Check .env.local
- Email issues: Set up EmailJS account
- HR access: Clear browser cookies if needed

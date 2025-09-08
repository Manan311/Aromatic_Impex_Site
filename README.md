# 🌶️ Aromatic Impex Inc. - Complete Business Solution

A complete business website with integrated HR system featuring premium spice showcase, automated email notifications, and employee time tracking with variable pay calculation.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.local.template .env.local
# Edit .env.local with your Hostinger database credentials
```

### 3. Set Up Database
1. Create MySQL database in Hostinger panel named `aromatic_impex_hr`
2. Import `database/schema.sql` via phpMyAdmin
3. Test connection: `npm run db:test`

### 4. Start Development
```bash
npm run dev
# Visit http://localhost:3000
```

## 🎯 Features

### Main Website
- Beautiful responsive spice showcase
- Quote request system with email notifications
- Professional contact form
- Easter egg HR access (click logo 5 times!)

### HR System
- Employee time tracking (clock in/out)
- Variable pay calculation:
  - Light Work (0.8x) - Slower days
  - Normal Work (1.0x) - Regular workload  
  - Heavy Work (1.2x) - Busy days
  - Overtime (1.5x) - Extended hours
- Admin dashboard and reports
- Secure authentication

### Email System (Optional)
- Set up EmailJS account for automated emails
- Customer confirmations + business notifications
- Professional branded templates

## 🔐 Default Login
- URL: `http://localhost:3000/internal/hr-system`
- Username: `admin`
- Password: `admin123`

**⚠️ Change default password immediately!**

## 📞 Support

### Useful Commands
```bash
npm run dev              # Start development
npm run db:test          # Test database
npm run password:hash    # Generate password hash
```

### Common Issues
- **Database connection fails**: Check .env.local credentials
- **Emails not sending**: Set up EmailJS account first
- **HR system access denied**: Clear browser cookies

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
# Add environment variables in dashboard
```

### Manual
```bash
npm run build
npm start
```

---

**🎉 Success!** You now have a complete professional business solution for your spice business with integrated employee management system.

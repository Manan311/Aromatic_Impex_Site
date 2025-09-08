# 🌶️ COMPLETE SETUP GUIDE - Aromatic Impex Business Solution

## 🎯 **OVERVIEW - WHAT YOU'RE BUILDING**

You're creating a **complete professional business solution** that includes:
- **Beautiful spice business website** with product showcase
- **Automated email system** for customer inquiries
- **Employee HR system** with time tracking and pay calculation
- **Admin dashboard** for managing employees and reports

**Total Time Needed:** 1-2 hours (depending on your setup experience)

---

## 📋 **PHASE 1: PROJECT CREATION (15 minutes)**

### **Step 1.1: Prepare Your Workspace**
```bash
# Create a workspace directory
mkdir aromatic-impex-workspace
cd aromatic-impex-workspace
```

### **Step 1.2: Create the Setup Scripts**
Create these two files in your workspace:

**File 1: `setup-project.sh`**
- Copy the entire content from **"setup-project.sh - Automated Project Setup Script"** artifact
- Save as `setup-project.sh`

**File 2: `setup-advanced.sh`**
- Copy the entire content from **"setup-advanced.sh - Complete Files Setup Script"** artifact  
- Save as `setup-advanced.sh`

### **Step 1.3: Run the Automated Setup**
```bash
# Make scripts executable
chmod +x setup-project.sh setup-advanced.sh

# Run basic project setup
./setup-project.sh

# Navigate to project and run advanced setup
cd aromatic-impex-complete
../setup-advanced.sh
```

**✅ Checkpoint:** You should see success messages and a `aromatic-impex-complete` folder with all files.

### **Step 1.4: Install Dependencies**
```bash
# Install all required packages
npm install
```

**✅ Checkpoint:** Installation should complete without errors. You'll see node_modules folder created.

---

## 🗄️ **PHASE 2: DATABASE SETUP (20 minutes)**

### **Step 2.1: Access Hostinger Control Panel**
1. **Login to your Hostinger account**
2. **Go to your hosting dashboard**
3. **Find "Databases" or "MySQL Databases" section**

### **Step 2.2: Create MySQL Database**
1. **Click "Create Database"**
2. **Database name:** `aromatic_impex_hr`
3. **Create a database user** (or use existing)
4. **Note down these details:**
   - **Database Host** (usually like `mysql123.hostinger.com`)
   - **Database Name** (`aromatic_impex_hr`)
   - **Username** (your database username)
   - **Password** (your database password)
   - **Port** (usually `3306`)

### **Step 2.3: Import Database Schema**
1. **Open phpMyAdmin** from Hostinger panel
2. **Select your `aromatic_impex_hr` database**
3. **Click "Import" tab**
4. **Choose file:** Browse to `database/schema.sql` in your project
5. **Click "Go"** to execute

**✅ Checkpoint:** You should see 5 tables created: `employees`, `time_entries`, `user_sessions`, `pay_adjustments`, `quote_requests`

### **Step 2.4: Configure Environment Variables**
```bash
# Copy environment template
cp .env.local.template .env.local

# Edit the file (use your preferred editor)
nano .env.local
# or
code .env.local
# or
vim .env.local
```

**Fill in your actual values:**
```env
# Database Configuration (YOUR HOSTINGER DETAILS)
DB_HOST=mysql123.hostinger.com
DB_USER=u123456789_dbuser
DB_PASSWORD=your_database_password
DB_NAME=aromatic_impex_hr
DB_PORT=3306

# Security (GENERATE A RANDOM STRING)
NEXTAUTH_SECRET=your_super_secret_random_key_min_32_characters_here_make_it_long_and_random
NEXTAUTH_URL=http://localhost:3000

# EmailJS (Leave blank for now - we'll fill this later)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

# Environment
NODE_ENV=development
```

### **Step 2.5: Test Database Connection**
```bash
# Test if database connection works
npm run db:test
```

**✅ Checkpoint:** Should see "✅ Database connected successfully!" and confirmation that all tables exist.

**❌ If it fails:** Double-check your database credentials in `.env.local`

---

## 🚀 **PHASE 3: FIRST RUN & TESTING (15 minutes)**

### **Step 3.1: Start Development Server**
```bash
# Start the development server
npm run dev
```

**✅ Checkpoint:** Should see "Ready on http://localhost:3000"

### **Step 3.2: Test Main Website**
1. **Open browser:** Go to `http://localhost:3000`
2. **Check all sections:**
   - ✅ Header with logo and navigation
   - ✅ Hero section with company name
   - ✅ Spices section with product cards
   - ✅ Contact section
   - ✅ Footer

### **Step 3.3: Test Quote Request System**
1. **Click "Request Quote" button**
2. **Fill out the form:**
   - Company: Test Company
   - Contact: Your Name
   - Email: your-email@example.com
   - Spices: Cumin, Cardamom
   - Quantity: 100kg
3. **Submit form**
4. **Should see:** Success message (email won't work yet - that's normal)

### **Step 3.4: Test HR System Access**
**Method 1 - Direct URL:**
1. **Go to:** `http://localhost:3000/internal/hr-system`
2. **Should see:** Login page

**Method 2 - Easter Egg:**
1. **Click the logo 5 times** on main page
2. **Should see:** "Staff Portal" link appear
3. **Click it** to access HR system

### **Step 3.5: Test Employee Login**
1. **Login with default credentials:**
   - Username: `admin`
   - Password: `admin123`
2. **Should see:** HR dashboard with time tracking interface

**✅ Checkpoint:** All basic functionality works without email system.

---

## 📧 **PHASE 4: EMAIL SYSTEM SETUP (25 minutes)**

### **Step 4.1: Create EmailJS Account**
1. **Go to:** [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Sign up** for free account (100 emails/month)
3. **Verify your email** address

### **Step 4.2: Add Email Service**
1. **In EmailJS dashboard:** Go to "Email Services"
2. **Click "Add New Service"**
3. **Choose "Gmail"** (recommended)
4. **Connect your Google account** (the business email you want to send from)
5. **Copy the Service ID** (like `service_xxxxxxx`)

### **Step 4.3: Create Email Templates**

**Template 1: Quote Confirmation (for customers)**
1. **Go to "Email Templates"** in EmailJS
2. **Click "Create New Template"**
3. **Template ID:** `quote_confirmation`
4. **Subject:** `Quote Request Received - Aromatic Impex Inc.`
5. **Content:** Copy this HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: linear-gradient(135deg, #16a34a, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌶️ Aromatic Impex Inc.</h1>
            <h2>Quote Request Received!</h2>
        </div>
        
        <div class="content">
            <p>Dear <strong>{{contact_name}}</strong>,</p>
            
            <p>Thank you for your interest in our premium spices! We've received your quote request and our team is working on preparing a detailed quote for you.</p>
            
            <div class="details">
                <h3>📋 Your Request Details:</h3>
                <p><strong>Company:</strong> {{company_name}}</p>
                <p><strong>Contact:</strong> {{contact_name}}</p>
                <p><strong>Email:</strong> {{to_email}}</p>
                <p><strong>Spice Types:</strong> {{spice_types}}</p>
                <p><strong>Quantity:</strong> {{quantity}}</p>
                <p><strong>Message:</strong> {{message}}</p>
                <p><strong>Submitted:</strong> {{submission_date}} at {{submission_time}}</p>
            </div>
            
            <p><strong>We'll get back to you within 24 hours with a detailed quote.</strong></p>
            
            <p>Best regards,<br>
            <strong>The Aromatic Impex Team</strong><br>
            📞 info@aromaticimpex.com</p>
        </div>
    </div>
</body>
</html>
```

**Template 2: Business Notification (for you)**
1. **Create another template**
2. **Template ID:** `business_notification`
3. **Subject:** `New Quote Request from {{company_name}}`
4. **Content:** Copy this HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .urgent { background: #fef3c7; border: 2px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 New Quote Request</h1>
            <p>{{submission_date}} at {{submission_time}}</p>
        </div>
        
        <div class="content">
            <div class="urgent">
                <h3>⚡ Action Required!</h3>
                <p>New quote request from <strong>{{company_name}}</strong> requires your attention.</p>
            </div>
            
            <div class="details">
                <h3>👤 Contact Information:</h3>
                <p><strong>Company:</strong> {{company_name}}</p>
                <p><strong>Contact:</strong> {{contact_name}}</p>
                <p><strong>Email:</strong> {{customer_email}}</p>
                <p><strong>Phone:</strong> {{customer_phone}}</p>
                
                <h3>📦 Request Details:</h3>
                <p><strong>Spice Types:</strong> {{spice_types}}</p>
                <p><strong>Quantity:</strong> {{quantity}}</p>
                <p><strong>Message:</strong> {{message}}</p>
            </div>
            
            <p><strong>Respond within 24 hours for best customer experience!</strong></p>
        </div>
    </div>
</body>
</html>
```

**Template 3: Contact Form Confirmation**
1. **Create third template**
2. **Template ID:** `contact_confirmation`
3. **Subject:** `Message Received - Aromatic Impex Inc.`
4. **Content:** Similar to quote confirmation but for contact form

### **Step 4.4: Get Your API Keys**
1. **Go to "Account" → "API Keys"**
2. **Copy your Public Key** (like `user_xxxxxxxxxxxxxxx`)

### **Step 4.5: Update Environment Variables**
Edit your `.env.local` file:
```env
# EmailJS Configuration (YOUR ACTUAL VALUES)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_xxxxxxxxxxxxxxx
```

### **Step 4.6: Test Email System**
1. **Restart your development server** (Ctrl+C, then `npm run dev`)
2. **Test quote request** with your real email
3. **Should receive 2 emails:**
   - Confirmation to your email
   - Notification to business email

**✅ Checkpoint:** Emails should arrive within 1-2 minutes.

---

## 🔐 **PHASE 5: SECURITY & CUSTOMIZATION (20 minutes)**

### **Step 5.1: Change Default Admin Password**
```bash
# Generate new password hash
npm run password:hash your_new_secure_password

# Copy the hash output
```

1. **Open phpMyAdmin** in Hostinger
2. **Go to `employees` table**
3. **Find the admin user**
4. **Edit the password field**
5. **Paste the hash** (replace the old one)
6. **Save changes**

### **Step 5.2: Test New Password**
1. **Logout from HR system** if logged in
2. **Login with new credentials:**
   - Username: `admin`
   - Password: `your_new_secure_password`

### **Step 5.3: Customize Business Information**
**Edit these files to match your business:**

**File: `app/page.tsx`**
- Update company address in contact section
- Change business email addresses
- Modify company description text
- Update service areas

**File: `lib/emailjs.ts`**
- Change reply-to email addresses
- Update business contact information

### **Step 5.4: Add Real Employee Accounts**
```bash
# Use the script to create employees
npm run password:hash employee_password

# Then add to database via phpMyAdmin:
```

```sql
INSERT INTO employees (username, password, first_name, last_name, email, role, hourly_rate, hire_date) 
VALUES ('john.doe', 'PASTE_HASH_HERE', 'John', 'Doe', 'john@yourcompany.com', 'employee', 18.00, CURDATE());
```

---

## 🌐 **PHASE 6: DEPLOYMENT (30 minutes)**

### **Step 6.1: Prepare for Production**
1. **Update environment for production:**
```env
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
```

2. **Build the project:**
```bash
npm run build
```

### **Step 6.2: Deploy to Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables in Vercel dashboard
```

### **Step 6.3: Deploy to Hostinger (Alternative)**
1. **Build locally:** `npm run build`
2. **Upload `.next` folder** and project files to Hostinger
3. **Configure Node.js** in Hostinger panel
4. **Set environment variables** in hosting panel

### **Step 6.4: Test Production Site**
1. **Visit your live domain**
2. **Test all functionality:**
   - Main website loads
   - Quote requests work
   - Email notifications arrive
   - HR system accessible
   - Employee login works

---

## 👥 **PHASE 7: EMPLOYEE TRAINING (15 minutes)**

### **Step 7.1: Create Employee Guide**
**For your employees, provide:**
- **HR System URL:** `https://yourdomain.com/internal/hr-system`
- **Their username and password**
- **Basic instructions:**
  1. Clock in when starting work
  2. Add notes about daily tasks
  3. Select workload level (Light/Normal/Heavy/Overtime)
  4. Clock out with break time

### **Step 7.2: Workload Level Guide**
**Train employees on workload levels:**
- **Light (0.8x pay):** Easy days, less physical work, slow periods
- **Normal (1.0x pay):** Regular workload, standard tasks
- **Heavy (1.2x pay):** Busy days, heavy lifting, rush orders
- **Overtime (1.5x pay):** Extended hours, urgent deadlines

### **Step 7.3: Manager Training**
**For managers/admins:**
- **Reports access:** Use Reports tab in HR system
- **Date range selection:** Weekly, monthly, custom periods
- **Employee management:** Adding new employees
- **Pay review:** Checking workload distribution

---

## 📊 **PHASE 8: ONGOING MAINTENANCE**

### **Daily Tasks:**
- ✅ Check email notifications for new inquiries
- ✅ Review employee time entries
- ✅ Respond to quote requests within 24 hours

### **Weekly Tasks:**
- ✅ Generate employee time reports
- ✅ Review workload distribution
- ✅ Check system performance

### **Monthly Tasks:**
- ✅ Database backup
- ✅ Review email deliverability
- ✅ Update employee information
- ✅ Generate payroll reports

### **Security Maintenance:**
- ✅ Change passwords quarterly
- ✅ Review employee access
- ✅ Monitor login attempts
- ✅ Update dependencies: `npm update`

---

## 🆘 **TROUBLESHOOTING GUIDE**

### **Database Connection Issues:**
```bash
# Test connection
npm run db:test

# Common solutions:
1. Check .env.local credentials
2. Verify database exists in Hostinger
3. Confirm database user permissions
4. Check if database service is running
```

### **Email Not Sending:**
1. **Check EmailJS template IDs** match exactly
2. **Verify public key** is correct
3. **Test with different email providers**
4. **Check browser console** for errors
5. **Verify EmailJS quota** (100 emails/month on free plan)

### **HR System Access Issues:**
1. **Clear browser cookies**
2. **Check if session expired**
3. **Verify database connection**
4. **Try incognito/private browsing**

### **Employee Login Problems:**
1. **Verify username exists** in database
2. **Check password hash** is correct
3. **Confirm user is active** (`is_active = TRUE`)
4. **Test with admin account** first

---

## ✅ **FINAL CHECKLIST**

### **Technical Setup:**
- [ ] ✅ Project created successfully
- [ ] ✅ Dependencies installed without errors  
- [ ] ✅ Database connected and tables created
- [ ] ✅ Environment variables configured
- [ ] ✅ EmailJS account set up and working
- [ ] ✅ Default password changed
- [ ] ✅ Production deployment successful

### **Functionality Testing:**
- [ ] ✅ Main website loads beautifully
- [ ] ✅ Quote requests send confirmation emails
- [ ] ✅ Business receives notification emails
- [ ] ✅ Contact form works with emails
- [ ] ✅ HR system accessible via URL
- [ ] ✅ Easter egg access works (click logo 5x)
- [ ] ✅ Employee login functional
- [ ] ✅ Time tracking works (clock in/out)
- [ ] ✅ Pay calculation accurate
- [ ] ✅ Workload levels affect pay correctly
- [ ] ✅ Admin reports display correctly

### **Business Readiness:**
- [ ] ✅ Real employee accounts created
- [ ] ✅ Business information updated
- [ ] ✅ Email addresses customized
- [ ] ✅ Employee training completed
- [ ] ✅ Manager access configured
- [ ] ✅ Backup procedures established

---

## 🎉 **CONGRATULATIONS!**

**You now have a complete professional business solution featuring:**

### **🌟 Beautiful Spice Business Website:**
- Professional responsive design
- Product showcase with 12+ spices
- Automated quote request system
- Professional contact forms
- Optimized for mobile and desktop

### **💼 Complete HR Management System:**
- Employee time tracking with clock in/out
- Variable pay calculation based on workload
- Admin dashboard with comprehensive reports
- Secure authentication and session management
- Hidden access for employee privacy

### **📧 Automated Email System:**
- Professional branded email templates
- Instant customer confirmations
- Business notification system
- Mobile-responsive email design
- Reliable delivery through EmailJS

### **💰 Smart Pay Calculation:**
- **Light Work (0.8x):** Perfect for slow days
- **Normal Work (1.0x):** Standard workload rate
- **Heavy Work (1.2x):** Compensation for busy periods
- **Overtime (1.5x):** Premium pay for extra hours

---

## 📞 **ONGOING SUPPORT**

### **Documentation Available:**
- ✅ Complete setup guide (this document)
- ✅ Database schema documentation
- ✅ EmailJS setup instructions
- ✅ Employee user manual
- ✅ Admin guide for reports
- ✅ Troubleshooting reference

### **Maintenance Resources:**
- ✅ Password hash generator script
- ✅ Database connection tester
- ✅ Backup procedures
- ✅ Update guidelines

---

**🌶️ Your Aromatic Impex business solution is now live and ready to serve customers while efficiently managing your workforce!**

**Next Steps:**
1. **Start promoting your website** to potential customers
2. **Train your team** on the HR system
3. **Monitor email notifications** for new business
4. **Generate weekly reports** to track productivity
5. **Scale your business** with confidence knowing your systems are automated

**Where Flavor Meets Technology - Your business just got a major upgrade!** 🚀
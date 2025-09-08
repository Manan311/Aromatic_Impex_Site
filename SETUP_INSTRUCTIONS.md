# HR Time Tracking System - Post-Setup Instructions

## 🎉 Setup Complete!

Your HR Time Tracking System has been set up. Here's what to do next:

## 1. Update Your Login Page

In your existing login page (`app/page.tsx`), update the handleLogin function to redirect based on role:

```typescript
if (response.ok) {
  const { employee } = await response.json();
  
  // Redirect based on role
  if (employee.role === 'admin' || employee.role === 'manager') {
    window.location.href = '/admin/dashboard';
  } else {
    window.location.href = '/employee/timesheet';
  }
}
```

## 2. Update Your Environment Variables

Make sure your `.env.local` file has:

```env
DB_HOST=your-hostinger-mysql-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=u265780679_aromatic_impex
NODE_ENV=development
```

## 3. Test the System

### Default Login Credentials:
- **Admin**: `admin` / `admin123` → Goes to `/admin/dashboard`
- **Employee**: `john.doe` / `admin123` → Goes to `/employee/timesheet`

### What to Test:
- [ ] Admin can view employee list and stats
- [ ] Admin can update hourly rates
- [ ] Admin can view time entries by date
- [ ] Employee can clock in with workload levels
- [ ] Employee can clock out with break times
- [ ] Employee can see personal stats

## 4. Features Overview

### Admin Dashboard Features:
- Real-time employee hours and costs
- Editable hourly rates
- Workload level tracking
- Weekly/daily statistics  
- Time entry filtering by date
- Currently clocked-in employees counter

### Employee Timesheet Features:
- Large clock in/out buttons
- Workload level selection (affects pay multiplier)
- Break time tracking
- Notes for shifts
- Real-time shift progress
- Personal statistics dashboard

## 5. Workload Multipliers:
- **Light**: 0.8x hourly rate
- **Normal**: 1.0x hourly rate (default)
- **Heavy**: 1.2x hourly rate
- **Overtime**: 1.5x hourly rate

## 6. Default Hourly Rates:
- Admin: $25.00/hour
- John Doe: $18.00/hour
- Jane Smith: $20.00/hour
- Mike Manager: $22.00/hour

## 7. Troubleshooting

If you encounter issues:

1. **Database connection errors**: Check your .env.local file
2. **Import errors**: Make sure your tsconfig.json has proper path mapping
3. **Session issues**: Ensure user_sessions table exists
4. **Clock in/out not working**: Verify time_entries table structure

## 8. Next Steps

- Change default passwords
- Customize hourly rates for your employees
- Test the full clock in/out workflow
- Train your staff on the new system

🎊 **Your HR Time Tracking System is ready to use!**

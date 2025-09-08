'use client';

import { useState, useEffect } from 'react';
import { 
  ClockIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
  EyeIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface Employee {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  hourly_rate: number;
  hire_date: string;
  is_active: boolean;
}

interface TimeEntry {
  id: number;
  employee_id: number;
  employee_name: string;
  clock_in_time: string;
  clock_out_time: string | null;
  total_hours: number;
  total_pay: number;
  workload_level: string;
  workload_multiplier: number;
  break_duration_minutes: number;
  status: string;
  date: string;
}

interface DashboardStats {
  totalEmployees: number;
  totalHoursToday: number;
  totalCostToday: number;
  totalHoursWeek: number;
  totalCostWeek: number;
  entriesTotal: number;
  currentlyClockedIn: number;
}

// Helper function to safely convert to number and apply toFixed
const safeToFixed = (value: any, decimals: number = 1): string => {
  const num = parseFloat(value) || 0;
  return num.toFixed(decimals);
};

// Helper function to safely convert to integer
const safeToInt = (value: any): number => {
  return parseInt(value) || 0;
};

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalHoursToday: 0,
    totalCostToday: 0,
    totalHoursWeek: 0,
    totalCostWeek: 0,
    entriesTotal: 0,
    currentlyClockedIn: 0
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedDate]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch employees with proper error handling
      try {
        const employeesRes = await fetch('/api/admin/employees');
        if (employeesRes.ok) {
          const employeesData = await employeesRes.json();
          console.log('✅ Employees data:', employeesData);
          setEmployees(Array.isArray(employeesData) ? employeesData : []);
        } else {
          console.error('❌ Employees API failed:', employeesRes.status);
          setEmployees([]);
        }
      } catch (empError) {
        console.error('❌ Employees fetch error:', empError);
        setEmployees([]);
      }
  
      // Fetch time entries with proper error handling
      try {
        const timeEntriesRes = await fetch(`/api/admin/time-entries?date=${selectedDate}`);
        if (timeEntriesRes.ok) {
          const timeEntriesData = await timeEntriesRes.json();
          console.log('✅ Time entries data:', timeEntriesData);
          setTimeEntries(Array.isArray(timeEntriesData) ? timeEntriesData : []);
        } else {
          console.error('❌ Time entries API failed:', timeEntriesRes.status);
          setTimeEntries([]);
        }
      } catch (timeError) {
        console.error('❌ Time entries fetch error:', timeError);
        setTimeEntries([]);
      }
  
      // Fetch stats with proper error handling
      try {
        const statsRes = await fetch('/api/admin/stats');
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          console.log('✅ Stats data:', statsData);
          
          // Ensure all stats are proper numbers
          const safeStats = {
            totalEmployees: safeToInt(statsData?.totalEmployees),
            totalHoursToday: parseFloat(statsData?.totalHoursToday) || 0,
            totalCostToday: parseFloat(statsData?.totalCostToday) || 0,
            totalHoursWeek: parseFloat(statsData?.totalHoursWeek) || 0,
            totalCostWeek: parseFloat(statsData?.totalCostWeek) || 0,
            entriesTotal: safeToInt(statsData?.entriesTotal),
            currentlyClockedIn: safeToInt(statsData?.currentlyClockedIn)
          };
          
          setStats(safeStats);
        } else {
          console.error('❌ Stats API failed:', statsRes.status);
        }
      } catch (statsError) {
        console.error('❌ Stats fetch error:', statsError);
      }
  
    } catch (error) {
      console.error('❌ General fetch error:', error);
      setEmployees([]);
      setTimeEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHourlyRate = async (employeeId: number, newRate: number) => {
    try {
      const response = await fetch(`/api/admin/employees/${employeeId}/rate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hourly_rate: newRate }),
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating hourly rate:', error);
    }
  };

  const formatCurrency = (amount: number | string) => {
    const num = parseFloat(amount as string) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWorkloadIcon = (level: string) => {
    switch (level) {
      case 'light': return '🟢';
      case 'normal': return '🟡';
      case 'heavy': return '🟠';
      case 'overtime': return '🔴';
      default: return '⚪';
    }
  };

  const getStatusBadge = (status: string, clockOut: string | null) => {
    if (!clockOut) {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        Active
      </span>;
    }
    
    switch (status) {
      case 'completed':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          Completed
        </span>;
      case 'pending_approval':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Pending
        </span>;
      default:
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <ClockIcon className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-slate-600">Aromatic Impex Inc. - HR Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-slate-500" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Employees</p>
                <p className="text-lg font-bold text-slate-900">{stats.totalEmployees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center">
              <UserIcon className="w-6 h-6 text-green-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Clocked In</p>
                <p className="text-lg font-bold text-slate-900">{stats.currentlyClockedIn}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 text-purple-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Hours Today</p>
                <p className="text-lg font-bold text-slate-900">{safeToFixed(stats.totalHoursToday)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-6 h-6 text-emerald-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Cost Today</p>
                <p className="text-lg font-bold text-slate-900">{formatCurrency(stats.totalCostToday)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center">
              <ChartBarIcon className="w-6 h-6 text-orange-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Week Hours</p>
                <p className="text-lg font-bold text-slate-900">{safeToFixed(stats.totalHoursWeek)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-6 h-6 text-red-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Week Cost</p>
                <p className="text-lg font-bold text-slate-900">{formatCurrency(stats.totalCostWeek)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center">
              <EyeIcon className="w-6 h-6 text-slate-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Entries</p>
                <p className="text-lg font-bold text-slate-900">{stats.entriesTotal}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-slate-800">Employee Management</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(employees) && employees.length > 0 ? (
                employees.map((employee) => (
                  <div key={employee.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {employee.first_name} {employee.last_name}
                        </h3>
                        <p className="text-sm text-slate-600">@{employee.username}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        employee.role === 'admin' ? 'bg-red-100 text-red-800' :
                        employee.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {employee.role}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600">
                      <p>Email: {employee.email}</p>
                      <p>Rate: {formatCurrency(employee.hourly_rate)}/hr</p>
                      <p>Hired: {new Date(employee.hire_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-500">
                    {isLoading ? 'Loading employees...' : 'No employees found or login required'}
                  </p>
                  {!isLoading && (
                    <button 
                      onClick={fetchDashboardData}
                      className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Retry
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-slate-800">
              Time Entries - {new Date(selectedDate).toLocaleDateString()}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Clock In
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Clock Out
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Workload
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Break
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Pay
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {timeEntries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                      No time entries for this date
                    </td>
                  </tr>
                ) : (
                  timeEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {entry.employee_name}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {formatTime(entry.clock_in_time)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {entry.clock_out_time ? formatTime(entry.clock_out_time) : '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {safeToFixed(entry.total_hours, 2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        <span className="flex items-center space-x-1">
                          <span>{getWorkloadIcon(entry.workload_level)}</span>
                          <span className="capitalize">{entry.workload_level}</span>
                          <span className="text-xs text-slate-500">({safeToFixed(entry.workload_multiplier, 1)}x)</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {safeToInt(entry.break_duration_minutes)} min
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {formatCurrency(entry.total_pay)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(entry.status, entry.clock_out_time)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

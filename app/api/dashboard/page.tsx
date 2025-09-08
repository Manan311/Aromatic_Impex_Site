'use client';

import { useState, useEffect } from 'react';
import { 
  ClockIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Employee {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  hourly_rate: number;
}

interface TimeEntry {
  id: number;
  employee_id: number;
  employee_name: string;
  clock_in: string;
  clock_out: string | null;
  hours_worked: number;
  date: string;
  total_pay: number;
}

interface DashboardStats {
  totalEmployees: number;
  totalHoursToday: number;
  totalCostToday: number;
  totalHoursWeek: number;
  totalCostWeek: number;
}

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalHoursToday: 0,
    totalCostToday: 0,
    totalHoursWeek: 0,
    totalCostWeek: 0
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedDate]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch employees
      const employeesRes = await fetch('/api/admin/employees');
      const employeesData = await employeesRes.json();
      setEmployees(employeesData);

      // Fetch time entries for selected date
      const timeEntriesRes = await fetch(`/api/admin/time-entries?date=${selectedDate}`);
      const timeEntriesData = await timeEntriesRes.json();
      setTimeEntries(timeEntriesData);

      // Fetch dashboard stats
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      setStats(statsData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating hourly rate:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
      {/* Header */}
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <UserGroupIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Employees</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalEmployees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Hours Today</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalHoursToday.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Cost Today</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalCostToday)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Hours This Week</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalHoursWeek.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Cost This Week</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalCostWeek)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Hourly Rates */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-slate-800">Employee Hourly Rates</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <div key={employee.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-slate-900">
                        {employee.first_name} {employee.last_name}
                      </p>
                      <p className="text-sm text-slate-600">@{employee.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Rate:</span>
                    <input
                      type="number"
                      step="0.50"
                      min="0"
                      value={employee.hourly_rate}
                      onChange={(e) => updateHourlyRate(employee.id, parseFloat(e.target.value))}
                      className="border border-slate-300 rounded px-2 py-1 text-sm w-20 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <span className="text-sm text-slate-600">/hour</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Entries for Selected Date */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Clock In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Clock Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total Pay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {timeEntries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No time entries for this date
                    </td>
                  </tr>
                ) : (
                  timeEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {entry.employee_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {formatTime(entry.clock_in)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {entry.clock_out ? formatTime(entry.clock_out) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {entry.hours_worked.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {formatCurrency(entry.total_pay)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          entry.clock_out 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {entry.clock_out ? 'Completed' : 'Active'}
                        </span>
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
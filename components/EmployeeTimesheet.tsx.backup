'use client';

import { useState, useEffect } from 'react';
import { 
  ClockIcon, 
  PlayIcon,
  StopIcon,
  CurrencyDollarIcon,
  UserIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon
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
}

interface EmployeeStats {
  todayHours: number;
  todayPay: number;
  weekHours: number;
  weekPay: number;
  isClocked: boolean;
  currentShiftStart: string | null;
  currentWorkload: string | null;
  currentBreakTime: number;
}

export default function EmployeeTimesheet() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [stats, setStats] = useState<EmployeeStats>({
    todayHours: 0,
    todayPay: 0,
    weekHours: 0,
    weekPay: 0,
    isClocked: false,
    currentShiftStart: null,
    currentWorkload: null,
    currentBreakTime: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workloadLevel, setWorkloadLevel] = useState('normal');
  const [breakDuration, setBreakDuration] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchEmployeeData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchEmployeeData = async () => {
    try {
      setIsLoading(true);
      const [employeeRes, statsRes] = await Promise.all([
        fetch('/api/employee/me'),
        fetch('/api/employee/stats')
      ]);
      
      setEmployee(await employeeRes.json());
      setStats(await statsRes.json());
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockIn = async () => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/employee/clock-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workload_level: workloadLevel, notes }),
      });

      if (response.ok) {
        await fetchEmployeeData();
        setNotes('');
      } else {
        const error = await response.json();
        alert('Error clocking in: ' + error.error);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleClockOut = async () => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/employee/clock-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ break_duration_minutes: breakDuration, notes }),
      });

      if (response.ok) {
        await fetchEmployeeData();
        setBreakDuration(0);
        setNotes('');
      } else {
        const error = await response.json();
        alert('Error clocking out: ' + error.error);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <ClockIcon className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-slate-600">Loading timesheet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Time Clock</h1>
              <p className="text-slate-600">
                Welcome, {employee?.first_name} {employee?.last_name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-bold text-slate-800">
                {currentTime.toLocaleTimeString()}
              </p>
              <p className="text-sm text-slate-600">
                {currentTime.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="px-6 py-6">
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
                stats.isClocked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {stats.isClocked ? (
                  <StopIcon className="w-16 h-16" />
                ) : (
                  <PlayIcon className="w-16 h-16" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {stats.isClocked ? 'Currently Clocked In' : 'Ready to Clock In'}
              </h2>

              {!stats.isClocked && (
                <div className="mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Workload Level
                    </label>
                    <select
                      value={workloadLevel}
                      onChange={(e) => setWorkloadLevel(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-2 w-48"
                    >
                      <option value="light">Light (0.8x rate)</option>
                      <option value="normal">Normal (1.0x rate)</option>
                      <option value="heavy">Heavy (1.2x rate)</option>
                      <option value="overtime">Overtime (1.5x rate)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any notes for this shift..."
                      className="border border-slate-300 rounded-lg px-3 py-2 w-full max-w-md h-20"
                    />
                  </div>
                </div>
              )}

              {stats.isClocked && (
                <div className="mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Break Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={breakDuration}
                      onChange={(e) => setBreakDuration(parseInt(e.target.value) || 0)}
                      className="border border-slate-300 rounded-lg px-3 py-2 w-32"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End-of-Shift Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any notes for this shift..."
                      className="border border-slate-300 rounded-lg px-3 py-2 w-full max-w-md h-20"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={stats.isClocked ? handleClockOut : handleClockIn}
                disabled={actionLoading}
                className={`px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 ${
                  stats.isClocked
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                }`}
              >
                {actionLoading ? 'Processing...' : (stats.isClocked ? 'Clock Out' : 'Clock In')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Today's Hours</p>
                <p className="text-2xl font-bold text-slate-900">{stats.todayHours.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Today's Pay</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.todayPay)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">This Week</p>
                <p className="text-2xl font-bold text-slate-900">{stats.weekHours.toFixed(1)}h</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <UserIcon className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Hourly Rate</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(employee?.hourly_rate || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Container from "@/app/components/container";
import Header from "@/app/components/header";
import Link from "next/link";

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number; // in days
  dependencies?: string[];
  notes?: string;
  category: 'foundation' | 'structure' | 'mechanical' | 'interior' | 'exterior' | 'final';
  status: 'completed' | 'in-progress' | 'upcoming' | 'pending' | 'client-deadline';
}

// Project tasks - Client view with key milestones only
const tasks: Task[] = [
  // Client Selection Deadlines
  {
    id: 'exterior-paint-colors-deadline',
    name: 'Exterior Paint Colors',
    startDate: '2025-08-23',
    endDate: '2025-08-23',
    duration: 1,
    category: 'exterior',
    status: 'completed'
  },
  {
    id: 'select-plumbing-fixtures-deadline',
    name: 'Select Plumbing Fixtures',
    startDate: '2025-09-15',
    endDate: '2025-09-15',
    duration: 1,
    category: 'mechanical',
    status: 'client-deadline'
  },
  {
    id: 'tile-selection-deadline',
    name: 'Tile Selection',
    startDate: '2025-08-25',
    endDate: '2025-08-25',
    duration: 1,
    category: 'interior',
    status: 'completed'
  },
  {
    id: 'wood-floor-selection-deadline',
    name: 'Wood Floor Selection',
    startDate: '2025-08-24',
    endDate: '2025-08-24',
    duration: 1,
    category: 'interior',
    status: 'completed'
  },
  {
    id: 'countertop-selection-deadline',
    name: 'Countertop Selection',
    startDate: '2025-09-07',
    endDate: '2025-09-07',
    duration: 1,
    category: 'interior',
    status: 'client-deadline'
  },
  {
    id: 'kitchen-backsplash-selection-deadline',
    name: 'Kitchen Backsplash Selection',
    startDate: '2025-09-12',
    endDate: '2025-09-12',
    duration: 1,
    category: 'interior',
    status: 'client-deadline'
  },

  // Structure & Rough Work
  {
    id: 'drywall',
    name: 'Drywall',
    startDate: '2025-08-14',
    endDate: '2025-08-22',
    duration: 9,
    category: 'structure',
    status: 'completed'
  },

  // Paint
  {
    id: 'paint-exterior',
    name: 'Paint Exterior',
    startDate: '2025-08-25',
    endDate: '2025-08-29',
    duration: 5,
    category: 'exterior',
    status: 'in-progress'
  },
  {
    id: 'paint-interior',
    name: 'Paint Interior',
    startDate: '2025-09-01',
    endDate: '2025-09-12',
    duration: 12,
    category: 'interior',
    status: 'in-progress'
  },

  // Electrical
  {
    id: 'order-light-fixtures',
    name: 'Select Light Fixtures',
    startDate: '2025-09-06',
    endDate: '2025-09-06',
    duration: 1,
    category: 'mechanical',
    status: 'client-deadline'
  },
  {
    id: 'electrical-trim',
    name: 'Electrical Trim',
    startDate: '2025-09-12',
    endDate: '2025-09-12',
    duration: 1,
    category: 'mechanical',
    status: 'upcoming'
  },
  {
    id: 'electrical-light-fixtures',
    name: 'Electrical Light Fixtures',
    startDate: '2025-09-29',
    endDate: '2025-09-29',
    duration: 1,
    category: 'mechanical',
    status: 'upcoming'
  },

  // Cabinets & Countertops
  {
    id: 'cabinet-install',
    name: 'Cabinet Install',
    startDate: '2025-09-15',
    endDate: '2025-09-19',
    duration: 5,
    category: 'interior',
    status: 'upcoming'
  },
  {
    id: 'measure-countertops',
    name: 'Measure Countertops',
    startDate: '2025-09-20',
    endDate: '2025-09-20',
    duration: 1,
    category: 'interior',
    status: 'upcoming'
  },
  {
    id: 'countertop-install',
    name: 'Countertop Install',
    startDate: '2025-10-06',
    endDate: '2025-10-06',
    duration: 1,
    category: 'interior',
    status: 'upcoming'
  },

  // Flooring & Tile
  {
    id: 'tile-bath-walls',
    name: 'Tile Bath Walls',
    startDate: '2025-09-15',
    endDate: '2025-09-24',
    duration: 10,
    category: 'interior',
    status: 'upcoming'
  },
  {
    id: 'tile-floor',
    name: 'Tile Floor',
    startDate: '2025-09-22',
    endDate: '2025-10-01',
    duration: 10,
    category: 'interior',
    status: 'upcoming'
  },
  {
    id: 'wood-floor',
    name: 'Wood Floor',
    startDate: '2025-09-15',
    endDate: '2025-09-26',
    duration: 12,
    category: 'interior',
    status: 'upcoming'
  },

  // Finishing
  {
    id: 'plumbing-trim',
    name: 'Plumbing Trim',
    startDate: '2025-10-13',
    endDate: '2025-10-13',
    duration: 1,
    category: 'mechanical',
    status: 'upcoming'
  },
  {
    id: 'kitchen-backsplash',
    name: 'Kitchen Backsplash',
    startDate: '2025-10-13',
    endDate: '2025-10-13',
    duration: 1,
    category: 'interior',
    status: 'upcoming'
  },
  {
    id: 'paint-touchup',
    name: 'Paint Touch-up',
    startDate: '2025-10-14',
    endDate: '2025-10-14',
    duration: 1,
    category: 'final',
    status: 'upcoming'
  },
  {
    id: 'clean',
    name: 'Clean',
    startDate: '2025-10-20',
    endDate: '2025-10-20',
    duration: 1,
    category: 'final',
    status: 'upcoming'
  }
];

// Helper functions for date calculations
const parseDate = (dateStr: string) => new Date(dateStr);
const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const getDatePosition = (date: Date, startDate: Date, endDate: Date, totalWidth: number) => {
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysSinceStart = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, Math.min(totalWidth, (daysSinceStart / totalDays) * totalWidth));
};

const getCategoryColor = (category: string) => {
  const colors = {
    foundation: 'bg-yellow-500',
    structure: 'bg-blue-500',
    mechanical: 'bg-purple-500',
    exterior: 'bg-green-500',
    interior: 'bg-orange-500',
    final: 'bg-red-500'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-500';
};

const getStatusColor = (status: string) => {
  const colors = {
    completed: 'bg-green-600',
    'in-progress': 'bg-blue-600',
    upcoming: 'bg-gray-400',
    'client-deadline': 'bg-yellow-500'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-400';
};

export default function ProjectTimeline() {
  // Calculate project date range
  const allDates = tasks.flatMap(task => [parseDate(task.startDate), parseDate(task.endDate)]);
  const projectStart = new Date(Math.min(...allDates.map(d => d.getTime())));
  const projectEnd = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  // Add some padding to the timeline
  projectStart.setDate(projectStart.getDate() - 2);
  projectEnd.setDate(projectEnd.getDate() + 2);

  return (
    <main>
      <Container>
        <Header />
        <div className="mb-32">
          {/* Header */}
          <div className="text-center py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl mb-12">
            <div className="inline-block bg-blue-900 dark:bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Project Timeline
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              Porter Ranch 7 GANTT Chart
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete project timeline and task dependencies
            </p>
          </div>

          {/* Back to Color Choices */}
          <div className="mb-8">
            <Link 
              href="/color-choices" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              ← Back to Color Choices
            </Link>
          </div>

          {/* GANTT Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Project Timeline - {formatDate(projectStart)} to {formatDate(projectEnd)}
            </h2>
            
            <div className="min-w-[1200px]">
              {/* Timeline Header */}
              <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="w-64 flex-shrink-0 pr-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Task Name</h3>
                </div>
                <div className="w-24 flex-shrink-0 pr-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Duration</h3>
                </div>
                <div className="flex-1 min-w-0">
                  {/* Date Headers */}
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span>{formatDate(projectStart)}</span>
                    <span>Sep 1</span>
                    <span>Sep 16</span>
                    <span>Oct 1</span>
                    <span>{formatDate(projectEnd)}</span>
                  </div>
                  <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded relative">
                    {/* Week markers */}
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"
                        style={{ left: `${(i * 10)}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Task Rows in Date Order */}
              {tasks
                .sort((a, b) => parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime())
                .map((task) => {
                  const taskStart = parseDate(task.startDate);
                  const taskEnd = parseDate(task.endDate);
                  const leftPosition = getDatePosition(taskStart, projectStart, projectEnd, 100);
                  const width = getDatePosition(taskEnd, projectStart, projectEnd, 100) - leftPosition;
                  
                  return (
                    <div key={task.id} className="flex items-center mb-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                      {/* Task Name */}
                      <div className="w-64 flex-shrink-0 pr-4">
                        <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          {task.name}
                        </div>
                      </div>
                      
                      {/* Duration */}
                      <div className="w-24 flex-shrink-0 pr-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {task.duration}d
                        </span>
                      </div>
                      
                      {/* Timeline Bar */}
                      <div className="flex-1 relative h-8 bg-gray-100 dark:bg-gray-700 rounded">
                        <div
                          className={`absolute top-1 bottom-1 rounded ${getStatusColor(task.status)} opacity-80`}
                          style={{
                            left: `${leftPosition}%`,
                            width: `${Math.max(width, 2)}%`
                          }}
                        />
                        {/* Date labels outside the bar */}
                        <div
                          className="absolute top-9 text-xs font-medium text-black dark:text-white whitespace-nowrap"
                          style={{
                            left: `${leftPosition}%`,
                          }}
                        >
                          {task.duration === 1 ? formatDate(taskStart) : `${formatDate(taskStart)} - ${formatDate(taskEnd)}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Legend:</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Status Colors */}
                <div>
                  <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Status:</h5>
                  <div className="space-y-1 text-xs">
                    {[
                      { key: 'completed', label: 'Completed' },
                      { key: 'in-progress', label: 'In Progress' },
                      { key: 'upcoming', label: 'Upcoming' },
                      { key: 'client-deadline', label: 'Client Selection Deadline' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${getStatusColor(key)}`}></div>
                        <span className="text-gray-600 dark:text-gray-400">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Notes:</h5>
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <div>🗓️ All dates are estimates and subject to change</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
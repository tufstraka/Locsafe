import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoDownloadOutline, IoShareOutline, IoPrintOutline, IoCalendarOutline } from 'react-icons/io5';
import { FaFileExcel, FaFilePdf, FaFileWord, FaFileCsv,  FaChartLine } from 'react-icons/fa';
import { MdAutorenew, MdDashboard, MdInsights, MdInventory, MdLocalShipping } from 'react-icons/md';
import { HiDocumentReport, HiDownload, HiOutlineDocumentText } from 'react-icons/hi';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Reports = () => {
  const { showNav, toggleNav } = useNavigation();
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  // const [selectedReport, setSelectedReport] = useState(null);

  // Report Templates
  const reportTemplates = [
    {
      id: 1,
      title: 'Monthly Performance Report',
      description: 'Comprehensive overview of all operations, deliveries, and KPIs',
      category: 'performance',
      icon: MdDashboard,
      color: 'from-blue-500 to-cyan-500',
      frequency: 'Monthly',
      lastGenerated: '2025-01-01',
      format: ['PDF', 'Excel'],
      size: '2.4 MB',
      scheduled: true
    },
    {
      id: 2,
      title: 'Financial Summary',
      description: 'Revenue, costs, profit margins, and financial projections',
      category: 'financial',
      icon: FaChartLine,
      color: 'from-green-500 to-teal-500',
      frequency: 'Weekly',
      lastGenerated: '2025-01-05',
      format: ['PDF', 'CSV'],
      size: '1.8 MB',
      scheduled: false
    },
    {
      id: 3,
      title: 'Inventory Analysis',
      description: 'Stock levels, turnover rates, and inventory optimization',
      category: 'inventory',
      icon: MdInventory,
      color: 'from-purple-500 to-pink-500',
      frequency: 'Daily',
      lastGenerated: '2025-01-08',
      format: ['Excel'],
      size: '3.1 MB',
      scheduled: true
    },
    {
      id: 4,
      title: 'Delivery Performance',
      description: 'On-time delivery rates, route efficiency, and driver performance',
      category: 'operations',
      icon: MdLocalShipping,
      color: 'from-orange-500 to-red-500',
      frequency: 'Weekly',
      lastGenerated: '2025-01-07',
      format: ['PDF'],
      size: '1.5 MB',
      scheduled: false
    },
    {
      id: 5,
      title: 'Customer Insights',
      description: 'Customer satisfaction, feedback analysis, and retention metrics',
      category: 'customer',
      icon: MdInsights,
      color: 'from-indigo-500 to-purple-500',
      frequency: 'Monthly',
      lastGenerated: '2025-01-01',
      format: ['PDF', 'Word'],
      size: '2.0 MB',
      scheduled: true
    },
    {
      id: 6,
      title: 'Compliance Report',
      description: 'Regulatory compliance, audits, and certification status',
      category: 'compliance',
      icon: HiOutlineDocumentText,
      color: 'from-gray-500 to-gray-600',
      frequency: 'Quarterly',
      lastGenerated: '2023-12-31',
      format: ['PDF'],
      size: '4.2 MB',
      scheduled: false
    }
  ];

  // Recent Reports
  const recentReports = [
    {
      id: 1,
      name: 'January 2025 Performance Report',
      type: 'Monthly Report',
      date: '2025-01-08 14:30',
      size: '2.4 MB',
      status: 'completed',
      icon: FaFilePdf
    },
    {
      id: 2,
      name: 'Week 1 Financial Summary',
      type: 'Weekly Report',
      date: '2025-01-07 09:00',
      size: '1.8 MB',
      status: 'completed',
      icon: FaFileExcel
    },
    {
      id: 3,
      name: 'Daily Inventory Report',
      type: 'Daily Report',
      date: '2025-01-08 06:00',
      size: '3.1 MB',
      status: 'completed',
      icon: FaFileExcel
    },
    {
      id: 4,
      name: 'Q4 2023 Compliance Report',
      type: 'Quarterly Report',
      date: '2023-12-31 18:00',
      size: '4.2 MB',
      status: 'completed',
      icon: FaFilePdf
    },
    {
      id: 5,
      name: 'Customer Satisfaction Analysis',
      type: 'Custom Report',
      date: '2025-01-06 11:30',
      size: '2.0 MB',
      status: 'processing',
      icon: FaFileWord
    }
  ];

  // Sample chart data for preview
  const performanceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [85, 88, 90, 92, 89, 94],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const distributionData = {
    labels: ['Completed', 'Pending', 'Failed'],
    datasets: [
      {
        data: [75, 20, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  const reportCategories = [
    { id: 'all', label: 'All Reports', count: reportTemplates.length },
    { id: 'performance', label: 'Performance', count: 1 },
    { id: 'financial', label: 'Financial', count: 1 },
    { id: 'inventory', label: 'Inventory', count: 1 },
    { id: 'operations', label: 'Operations', count: 1 },
    { id: 'customer', label: 'Customer', count: 1 },
    { id: 'compliance', label: 'Compliance', count: 1 }
  ];

  const filteredReports = reportTemplates.filter(report => 
    selectedReportType === 'all' || report.category === selectedReportType
  );

  const getFormatIcon = (format) => {
    switch(format.toLowerCase()) {
      case 'pdf': return FaFilePdf;
      case 'excel': return FaFileExcel;
      case 'word': return FaFileWord;
      case 'csv': return FaFileCsv;
      default: return HiDocumentReport;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:relative z-40 h-full"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {showNav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleNav}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <div className="flex flex-col flex-grow">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between px-4 sm:px-6 py-4 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-xl shadow-elevation-1 dark:shadow-elevation-dark-1 sticky top-0 z-20"
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleNav}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
              aria-label="Toggle navigation"
            >
              <IoMenu className="text-2xl text-on-surface-light dark:text-on-surface-dark" />
            </motion.button>
            
            <div>
              <h1 className="headline-6 sm:headline-5 text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                <HiDocumentReport className="text-primary-500" />
                Reports Center
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium hidden sm:block">
                Generate and manage reports
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all"
            >
              <IoCalendarOutline className="text-gray-600 dark:text-gray-400" />
              <span className="hidden md:inline text-sm">Schedule</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-2"
            >
              <HiDownload />
              <span className="hidden sm:inline">Create Report</span>
            </motion.button>
          </div>
        </motion.header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Filters - Hidden on mobile */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-y-auto"
          >
            {/* Report Categories */}
            <div className="mb-6">
              <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-3">Categories</h2>
              <div className="space-y-1">
                {reportCategories.map(category => (
                  <motion.button
                    key={category.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedReportType(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedReportType === category.id
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="subtitle-2">{category.label}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      selectedReportType === category.id
                        ? 'bg-primary-200 dark:bg-primary-800'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Timeframe Filter */}
            <div className="mb-6">
              <h3 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-3">Timeframe</h3>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none text-sm"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Quick Stats */}
            <div className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
              <h3 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-3">Statistics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Generated Today</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Scheduled</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Processing</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Category Pills */}
          <div className="lg:hidden w-full">
            <div className="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {reportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedReportType(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedReportType === category.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Report Templates Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="headline-6 text-on-surface-light dark:text-on-surface-dark mb-4">Report Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all overflow-hidden"
                  >
                    <div className={`h-2 bg-gradient-to-r ${report.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${report.color} rounded-xl flex items-center justify-center shadow-elevation-2`}>
                          <report.icon className="text-white text-xl" />
                        </div>
                        {report.scheduled && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                            <MdAutorenew className="text-sm" />
                            Scheduled
                          </span>
                        )}
                      </div>

                      <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-2">
                        {report.title}
                      </h3>
                      <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-4">
                        {report.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Frequency:</span>
                          <span className="font-medium">{report.frequency}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Last Generated:</span>
                          <span className="font-medium">{report.lastGenerated}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Format:</span>
                          <div className="flex gap-2">
                            {report.format.map(format => {
                              const Icon = getFormatIcon(format);
                              return (
                                <Icon key={format} className="text-gray-600 dark:text-gray-400" />
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          // onClick={() => setSelectedReport(report)}
                          className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                        >
                          Generate
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <IoCalendarOutline />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <IoShareOutline />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="headline-6 text-on-surface-light dark:text-on-surface-dark">Recent Reports</h2>
                <button className="text-primary-600 dark:text-primary-400 text-sm hover:text-primary-700 dark:hover:text-primary-300">
                  View All
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Report Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <report.icon className="text-gray-400 text-xl" />
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {report.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {report.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {report.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {report.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              report.status === 'completed' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <IoDownloadOutline className="text-gray-600 dark:text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <IoShareOutline className="text-gray-600 dark:text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <IoPrintOutline className="text-gray-600 dark:text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Charts Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
                <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                  Report Generation Trend
                </h3>
                <div className="h-48">
                  <Line data={performanceChartData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
                <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                  Report Status Distribution
                </h3>
                <div className="h-48">
                  <Doughnut data={distributionData} options={chartOptions} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-elevation-5"
            >
              <h2 className="headline-6 text-on-surface-light dark:text-on-surface-dark mb-4">
                Schedule Report
              </h2>
              <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-4">
                Set up automatic report generation
              </p>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Reports;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoTrendingUp, IoTrendingDown, IoDownloadOutline, IoRefreshOutline } from 'react-icons/io5';
import { FaChartLine, FaBrain } from 'react-icons/fa';
import { MdAutoGraph, MdTrendingUp, MdWarning, MdSpeed } from 'react-icons/md';
import { HiChip, HiSparkles } from 'react-icons/hi';
import { BiTargetLock, BiPulse } from 'react-icons/bi';
import { Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
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
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Insights = () => {
  const { showNav, toggleNav } = useNavigation();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedInsightType, setSelectedInsightType] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Performance Metrics Data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Deliveries',
        data: [650, 780, 890, 920, 1050, 1100, 1250],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Revenue',
        data: [850, 950, 1100, 1200, 1350, 1400, 1550],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  // Efficiency Radar Data
  const efficiencyData = {
    labels: ['Route Optimization', 'Fuel Efficiency', 'Time Management', 'Resource Utilization', 'Customer Satisfaction', 'Cost Effectiveness'],
    datasets: [
      {
        label: 'Current Month',
        data: [88, 92, 85, 78, 95, 82],
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        borderColor: 'rgb(20, 184, 166)',
        pointBackgroundColor: 'rgb(20, 184, 166)',
      },
      {
        label: 'Previous Month',
        data: [75, 85, 80, 72, 88, 78],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
      }
    ]
  };

  // Cost Distribution Data
  const costData = {
    labels: ['Fuel', 'Maintenance', 'Labor', 'Insurance', 'Technology', 'Other'],
    datasets: [
      {
        data: [35, 20, 25, 10, 7, 3],
        backgroundColor: [
          'rgba(20, 184, 166, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(163, 163, 163, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  // Predictive Trends Data
  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Actual',
        data: [120, 135, 128, 142, 155, 148],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
      },
      {
        label: 'Predicted',
        data: [null, null, null, null, 155, 165],
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        borderDash: [5, 5],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      }
    }
  };

  // AI Insights
  const aiInsights = [
    {
      id: 1,
      type: 'optimization',
      priority: 'high',
      title: 'Route Optimization Opportunity',
      description: 'AI detected that consolidating Northern region deliveries could reduce travel distance by 23% and save 4 hours daily.',
      confidence: 92,
      impact: '+$12,500/month',
      icon: MdAutoGraph,
      color: 'success',
      actionable: true
    },
    {
      id: 2,
      type: 'prediction',
      priority: 'medium',
      title: 'Demand Surge Expected',
      description: 'Based on historical patterns and current trends, expect 45% increase in orders for next week. Consider increasing fleet availability.',
      confidence: 87,
      impact: '+2,340 orders',
      icon: MdTrendingUp,
      color: 'warning',
      actionable: true
    },
    {
      id: 3,
      type: 'anomaly',
      priority: 'high',
      title: 'Cost Anomaly Detected',
      description: 'Fuel costs have increased 18% above normal range. Investigation shows inefficient routing in Western corridor.',
      confidence: 95,
      impact: '-$8,200/month',
      icon: MdWarning,
      color: 'error',
      actionable: true
    },
    {
      id: 4,
      type: 'efficiency',
      priority: 'medium',
      title: 'Fleet Utilization Insight',
      description: '3 vehicles consistently underutilized during mid-week. Consider reassignment or maintenance scheduling.',
      confidence: 78,
      impact: 'Save $4,500/month',
      icon: MdSpeed,
      color: 'info',
      actionable: true
    }
  ];

  // Key Metrics
  const keyMetrics = [
    {
      title: 'Average Delivery Time',
      value: '42',
      unit: 'min',
      change: -12,
      trend: 'up',
      icon: MdSpeed,
      gradient: 'from-teal-500 to-green-500'
    },
    {
      title: 'Cost per Delivery',
      value: '$8.50',
      unit: '',
      change: -5.2,
      trend: 'up',
      icon: FaChartLine,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Fleet Efficiency',
      value: '87',
      unit: '%',
      change: 8.5,
      trend: 'up',
      icon: BiTargetLock,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Prediction Accuracy',
      value: '94.2',
      unit: '%',
      change: 2.1,
      trend: 'up',
      icon: FaBrain,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
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
          className="flex items-center justify-between px-6 py-4 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-xl shadow-elevation-1 dark:shadow-elevation-dark-1 sticky top-0 z-20"
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
              <h1 className="headline-5 text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                <HiChip className="text-primary-500" />
                AI Insights & Analytics
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                Powered by Machine Learning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe Selector */}
            <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              {['Day', 'Week', 'Month', 'Year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period.toLowerCase())}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedTimeframe === period.toLowerCase()
                      ? 'bg-primary-500 text-white shadow-elevation-2'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className={`p-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              <IoRefreshOutline className="text-xl text-gray-600 dark:text-gray-400" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-2"
            >
              <IoDownloadOutline />
              Export Report
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Key Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          >
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.gradient} rounded-xl flex items-center justify-center shadow-elevation-2`}>
                    <metric.icon className="text-white text-xl" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    metric.trend === 'up' 
                      ? 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400' 
                      : 'bg-error-100 dark:bg-error-900/30 text-error-600 dark:text-error-400'
                  }`}>
                    {metric.trend === 'up' ? <IoTrendingUp /> : <IoTrendingDown />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                <h3 className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mb-1">
                  {metric.title}
                </h3>
                <p className="headline-5 text-on-surface-light dark:text-on-surface-dark">
                  {metric.value}<span className="text-lg">{metric.unit}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Insights Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="headline-6 text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                <HiSparkles className="text-primary-500" />
                AI-Powered Recommendations
              </h2>
              <div className="flex gap-2">
                {['all', 'optimization', 'prediction', 'anomaly'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedInsightType(type)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedInsightType === type
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aiInsights
                .filter(insight => selectedInsightType === 'all' || insight.type === selectedInsightType)
                .map((insight) => (
                <motion.div
                  key={insight.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 border-l-4 ${
                    insight.color === 'success' ? 'border-success-500' :
                    insight.color === 'warning' ? 'border-warning-500' :
                    insight.color === 'error' ? 'border-error-500' :
                    'border-info-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      insight.color === 'success' ? 'bg-success-100 dark:bg-success-900/20 text-success-600 dark:text-success-400' :
                      insight.color === 'warning' ? 'bg-warning-100 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400' :
                      insight.color === 'error' ? 'bg-error-100 dark:bg-error-900/20 text-error-600 dark:text-error-400' :
                      'bg-info-100 dark:bg-info-900/20 text-info-600 dark:text-info-400'
                    }`}>
                      <insight.icon className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                          {insight.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          insight.priority === 'high' ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400' :
                          'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400'
                        }`}>
                          {insight.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-3">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <BiPulse className="text-gray-400" />
                            <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                              {insight.confidence}% confidence
                            </span>
                          </div>
                          <span className={`caption font-semibold ${
                            insight.impact.startsWith('+') ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
                          }`}>
                            {insight.impact}
                          </span>
                        </div>
                        {insight.actionable && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                          >
                            Take Action
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Performance Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                  Performance Trends
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span className="caption">Deliveries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="caption">Revenue</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <Line data={performanceData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Cost Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2"
            >
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                Cost Distribution
              </h3>
              <div className="h-56">
                <Doughnut data={costData} />
              </div>
            </motion.div>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Efficiency Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2"
            >
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                Efficiency Analysis
              </h3>
              <div className="h-64">
                <Radar data={efficiencyData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: true } } }} />
              </div>
            </motion.div>

            {/* Predictive Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2"
            >
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                Predictive Analysis
              </h3>
              <div className="h-64">
                <Line data={trendData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: true } } }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;

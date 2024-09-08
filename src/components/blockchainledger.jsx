import { useState, useEffect } from 'react';
import { FaCoins, FaExchangeAlt, FaCheckCircle, FaTruck } from 'react-icons/fa';

const BlockchainLedgerSummary = () => {
  const [ledgerData, setLedgerData] = useState({
    totalAssetTransfers: 120,
    pendingTransfers: 8,
    completedHandovers: 112,
    recentTransfers: [],
  });

  useEffect(() => {
    const generateRandomAssetTransfers = () => {
      const transfers = [];
      const statuses = ['Pending', 'Confirmed', 'Failed'];
      const involvedParties = ['Warehouse A', 'Retailer B', 'Distributor X', 'Manufacturer Y'];

      for (let i = 0; i < 5; i++) {
        transfers.push({
          id: `0x${Math.random().toString(16).slice(2, 10)}`,
          asset: `Product #${Math.floor(Math.random() * 1000)}`,
          from: involvedParties[Math.floor(Math.random() * involvedParties.length)],
          to: involvedParties[Math.floor(Math.random() * involvedParties.length)],
          amount: `${Math.floor(Math.random() * 100)} units`,
          timestamp: new Date().toLocaleString(),
          status: statuses[Math.floor(Math.random() * statuses.length)],
        });
      }
      return transfers;
    };

    const fetchLedgerData = async () => {
      try {
        const generatedTransfers = generateRandomAssetTransfers();
        setLedgerData((prevData) => ({
          ...prevData,
          recentTransfers: generatedTransfers,
        }));
      } catch (error) {
        console.error('Error fetching asset transfer data: ', error);
      }
    };

    fetchLedgerData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
        Blockchain Asset Transfer Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <FaExchangeAlt className="w-5 h-5 text-blue-500 mr-4" />
          <div>
            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Asset Transfers
            </span>
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              {ledgerData.totalAssetTransfers}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <FaTruck className="w-5 h-5 text-yellow-500 mr-4" />
          <div>
            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Transfers
            </span>
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              {ledgerData.pendingTransfers}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <FaCheckCircle className="w-5 h-5 text-green-500 mr-4" />
          <div>
            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Completed Handovers
            </span>
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              {ledgerData.completedHandovers}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transfers */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
          Recent Asset Transfers
        </h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {ledgerData.recentTransfers.map((transfer, index) => (
            <li key={index} className="py-4 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {transfer.asset}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  From: {transfer.from} → To: {transfer.to}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Transfer ID: {transfer.id} - {transfer.timestamp}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {transfer.amount}
                </span>
                <span
                  className={`text-xs ${
                    transfer.status === 'Confirmed'
                      ? 'text-green-500'
                      : transfer.status === 'Pending'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}
                >
                  {transfer.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlockchainLedgerSummary;


import { useState, useEffect } from 'react';
import { FaCoins, FaClock, FaCheck } from 'react-icons/fa';
import { getBlockchainData } from '../utils/blockchainService'; // Assume this function fetches blockchain data

const BlockchainLedgerSummary = () => {
  const [ledgerData, setLedgerData] = useState({
    totalTransactions: 0,
    pendingConfirmations: 0,
    blockchainBalance: '0 ETH',
  });

  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const data = await getBlockchainData();
        setLedgerData(data);
      } catch (error) {
        console.error('Error fetching blockchain data: ', error);
      }
    };

    fetchLedgerData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
        Blockchain Ledger Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <FaCoins className="w-5 h-5 text-blue-500 mr-4" />
          <div>
            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Transactions
            </span>
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              {ledgerData.totalTransactions}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <FaClock className="w-5 h-5 text-yellow-500 mr-4" />
          <div>
            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Confirmations
            </span>
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              {ledgerData.pendingConfirmations}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <FaCheck className="w-5 h-5 text-green-500 mr-4" />
          <div>
            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Blockchain Balance
            </span>
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              {ledgerData.blockchainBalance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainLedgerSummary;

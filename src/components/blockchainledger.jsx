import { useState, useEffect } from 'react';
import { FaCoins, FaClock, FaCheck } from 'react-icons/fa';
//import { getBlockchainData } from '../utils/blockchainService'; // Placeholder service to fetch blockchain data

const BlockchainLedgerSummary = () => {
  const [ledgerData, setLedgerData] = useState({
    totalTransactions: 250,
    pendingConfirmations: 10,
    blockchainBalance: '4.85 ETH',
    recentTransactions: [],
  });

  useEffect(() => {
    const generateRandomTransactions = () => {
      const transactions = [];
      const transactionTypes = ['Asset Transfer', 'Payment', 'Confirmation'];

      for (let i = 0; i < 5; i++) {
        transactions.push({
          id: `0x${Math.random().toString(16).slice(2, 10)}`,
          type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
          amount: `${(Math.random() * 5).toFixed(2)} ETH`,
          timestamp: new Date().toLocaleString(),
          status: Math.random() > 0.5 ? 'Confirmed' : 'Pending',
        });
      }
      return transactions;
    };

    const fetchLedgerData = async () => {
      try {
        //const data = await getBlockchainData(); // Placeholder for API call
        setLedgerData({
          //...data,
          recentTransactions: generateRandomTransactions(),
        });
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

      {/* Recent Transactions */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
          Recent Transactions
        </h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {ledgerData.recentTransactions.map((transaction, index) => (
            <li key={index} className="py-4 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {transaction.type}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {transaction.id} - {transaction.timestamp}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {transaction.amount}
                </span>
                <span
                  className={`text-xs ${
                    transaction.status === 'Confirmed'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {transaction.status}
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


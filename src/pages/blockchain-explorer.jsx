import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoSearch, IoCopyOutline } from 'react-icons/io5';
import { FaEthereum, FaBitcoin, FaExternalLinkAlt } from 'react-icons/fa';
import { SiBinance, SiPolkadot, SiCardano, SiSolana } from 'react-icons/si';
import { MdVerified, MdAccessTime, MdSpeed } from 'react-icons/md';
import { HiCube } from 'react-icons/hi';

const BlockchainExplorer = () => {
  const { showNav, toggleNav } = useNavigation();
  const [selectedBlockchain, setSelectedBlockchain] = useState('ethereum');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('transaction');

  const blockchains = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: FaEthereum,
      color: '#627EEA',
      explorer: 'https://etherscan.io',
      description: 'Decentralized platform for smart contracts',
      network: 'Mainnet',
      blockTime: '13 seconds',
      tps: '15 TPS',
      totalTransactions: '1.7B+',
      status: 'active'
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: FaBitcoin,
      color: '#F7931A',
      explorer: 'https://blockstream.info',
      description: 'First and most valuable cryptocurrency',
      network: 'Mainnet',
      blockTime: '10 minutes',
      tps: '7 TPS',
      totalTransactions: '800M+',
      status: 'active'
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      icon: '🟣',
      color: '#8247E5',
      explorer: 'https://polygonscan.com',
      description: 'Ethereum scaling solution',
      network: 'PoS Chain',
      blockTime: '2 seconds',
      tps: '7,000 TPS',
      totalTransactions: '3.4B+',
      status: 'active'
    },
    {
      id: 'binance',
      name: 'Binance Smart Chain',
      symbol: 'BNB',
      icon: SiBinance,
      color: '#F3BA2F',
      explorer: 'https://bscscan.com',
      description: 'High-performance blockchain',
      network: 'BNB Chain',
      blockTime: '3 seconds',
      tps: '160 TPS',
      totalTransactions: '3.8B+',
      status: 'active'
    },
    {
      id: 'avalanche',
      name: 'Avalanche',
      symbol: 'AVAX',
      icon: '🔺',
      color: '#E84142',
      explorer: 'https://snowtrace.io',
      description: 'Fast, low-cost, and eco-friendly',
      network: 'C-Chain',
      blockTime: '2 seconds',
      tps: '4,500 TPS',
      totalTransactions: '500M+',
      status: 'active'
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      icon: SiCardano,
      color: '#0033AD',
      explorer: 'https://cardanoscan.io',
      description: 'Proof-of-stake blockchain platform',
      network: 'Mainnet',
      blockTime: '20 seconds',
      tps: '250 TPS',
      totalTransactions: '70M+',
      status: 'active'
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      icon: SiSolana,
      color: '#14F195',
      explorer: 'https://solscan.io',
      description: 'Ultra-fast blockchain',
      network: 'Mainnet Beta',
      blockTime: '400ms',
      tps: '65,000 TPS',
      totalTransactions: '200B+',
      status: 'active'
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      symbol: 'ARB',
      icon: '🔷',
      color: '#2D374B',
      explorer: 'https://arbiscan.io',
      description: 'Ethereum Layer 2 scaling',
      network: 'Arbitrum One',
      blockTime: '250ms',
      tps: '40,000 TPS',
      totalTransactions: '500M+',
      status: 'active'
    },
    {
      id: 'optimism',
      name: 'Optimism',
      symbol: 'OP',
      icon: '🔴',
      color: '#FF0420',
      explorer: 'https://optimistic.etherscan.io',
      description: 'Ethereum Layer 2 solution',
      network: 'OP Mainnet',
      blockTime: '2 seconds',
      tps: '2,000 TPS',
      totalTransactions: '300M+',
      status: 'active'
    },
    {
      id: 'cosmos',
      name: 'Cosmos',
      symbol: 'ATOM',
      icon: '⚛️',
      color: '#2E3148',
      explorer: 'https://www.mintscan.io/cosmos',
      description: 'Internet of blockchains',
      network: 'Cosmos Hub',
      blockTime: '7 seconds',
      tps: '10,000 TPS',
      totalTransactions: '50M+',
      status: 'active'
    },
    {
      id: 'hyperledger',
      name: 'Hyperledger Fabric',
      symbol: 'HLF',
      icon: '🔗',
      color: '#2F3134',
      explorer: 'https://hyperledger-fabric.readthedocs.io',
      description: 'Enterprise blockchain framework',
      network: 'Private Network',
      blockTime: 'Configurable',
      tps: '3,500 TPS',
      totalTransactions: 'Private',
      status: 'enterprise'
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      icon: SiPolkadot,
      color: '#E6007A',
      explorer: 'https://polkadot.subscan.io',
      description: 'Multi-chain network',
      network: 'Relay Chain',
      blockTime: '6 seconds',
      tps: '1,000 TPS',
      totalTransactions: '150M+',
      status: 'active'
    }
  ];

  const recentTransactions = [
    {
      hash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bFAb',
      type: 'DPP Creation',
      status: 'confirmed',
      timestamp: '2 mins ago',
      blockchain: 'ethereum',
      value: '0.002 ETH'
    },
    {
      hash: '0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed',
      type: 'Supply Chain Update',
      status: 'confirmed',
      timestamp: '5 mins ago',
      blockchain: 'polygon',
      value: '10 MATIC'
    },
    {
      hash: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
      type: 'Asset Transfer',
      status: 'pending',
      timestamp: '8 mins ago',
      blockchain: 'binance',
      value: '0.5 BNB'
    },
    {
      hash: '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
      type: 'Smart Contract Call',
      status: 'confirmed',
      timestamp: '15 mins ago',
      blockchain: 'avalanche',
      value: '25 AVAX'
    }
  ];

  const handleSearch = () => {
    const blockchain = blockchains.find(b => b.id === selectedBlockchain);
    if (blockchain && searchQuery) {
      let searchUrl = blockchain.explorer;
      
      switch(searchType) {
        case 'transaction':
          searchUrl += `/tx/${searchQuery}`;
          break;
        case 'address':
          searchUrl += `/address/${searchQuery}`;
          break;
        case 'block':
          searchUrl += `/block/${searchQuery}`;
          break;
        default:
          searchUrl += `/search?q=${searchQuery}`;
      }
      
      window.open(searchUrl, '_blank');
    }
  };

  const openExplorer = (blockchain) => {
    window.open(blockchain.explorer, '_blank');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
                <HiCube className="text-primary-500" />
                Blockchain Explorer
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                Multi-chain transaction explorer and analytics
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center gap-3">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg outline-none text-sm"
            >
              <option value="transaction">Transaction</option>
              <option value="address">Address</option>
              <option value="block">Block</option>
            </select>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1">
              <IoSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by hash, address, or block..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-transparent outline-none text-sm w-80"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Search
            </motion.button>
          </div>
        </motion.header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Blockchain Networks Grid */}
          <div className="mb-8">
            <h2 className="headline-6 text-on-surface-light dark:text-on-surface-dark mb-4">
              Supported Blockchain Networks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {blockchains.map((blockchain) => (
                <motion.div
                  key={blockchain.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedBlockchain(blockchain.id)}
                  className={`relative bg-white dark:bg-gray-900 rounded-xl p-5 cursor-pointer transition-all ${
                    selectedBlockchain === blockchain.id
                      ? 'ring-2 ring-primary-500 shadow-elevation-3'
                      : 'shadow-elevation-2 hover:shadow-elevation-3'
                  }`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      blockchain.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {blockchain.status}
                    </span>
                  </div>

                  {/* Icon and Name */}
                  <div className="flex items-center gap-3 mb-3">
                    {typeof blockchain.icon === 'string' ? (
                      <span className="text-3xl">{blockchain.icon}</span>
                    ) : (
                      <blockchain.icon 
                        className="text-3xl"
                        style={{ color: blockchain.color }}
                      />
                    )}
                    <div>
                      <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                        {blockchain.name}
                      </h3>
                      <p className="caption text-gray-500 dark:text-gray-400">
                        {blockchain.symbol}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="caption text-gray-600 dark:text-gray-400 mb-3">
                    {blockchain.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <p className="caption text-gray-500 dark:text-gray-400">Block Time</p>
                      <p className="caption font-semibold">{blockchain.blockTime}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <p className="caption text-gray-500 dark:text-gray-400">Speed</p>
                      <p className="caption font-semibold">{blockchain.tps}</p>
                    </div>
                  </div>

                  {/* Explorer Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openExplorer(blockchain);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center gap-2"
                  >
                    Open Explorer
                    <FaExternalLinkAlt className="text-xs" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Locsafe Transactions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4 flex items-center gap-2">
                <MdAccessTime className="text-primary-500" />
                Recent Locsafe Transactions
              </h3>
              <div className="space-y-3">
                {recentTransactions.map((tx, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        tx.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                      } animate-pulse`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="caption font-mono text-primary-600 dark:text-primary-400">
                            {tx.hash.slice(0, 12)}...{tx.hash.slice(-8)}
                          </p>
                          <button
                            onClick={() => copyToClipboard(tx.hash)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <IoCopyOutline className="text-sm" />
                          </button>
                        </div>
                        <p className="caption text-gray-500 dark:text-gray-400">
                          {tx.type} • {tx.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="caption font-semibold">{tx.value}</p>
                      <p className="caption text-gray-500 dark:text-gray-400">
                        {blockchains.find(b => b.id === tx.blockchain)?.symbol}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Network Statistics */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4 flex items-center gap-2">
                <MdSpeed className="text-primary-500" />
                Network Statistics
              </h3>
              {selectedBlockchain && (
                <div className="space-y-4">
                  {(() => {
                    const blockchain = blockchains.find(b => b.id === selectedBlockchain);
                    return (
                      <>
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
                          <span className="caption font-medium">Network</span>
                          <span className="subtitle-2">{blockchain?.name}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="caption">Total Transactions</span>
                          <span className="caption font-semibold">{blockchain?.totalTransactions}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="caption">Average Block Time</span>
                          <span className="caption font-semibold">{blockchain?.blockTime}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="caption">Throughput</span>
                          <span className="caption font-semibold">{blockchain?.tps}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="caption">Network Type</span>
                          <span className="caption font-semibold">{blockchain?.network}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Integration Status */}
          <div className="mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="headline-6 mb-2 flex items-center gap-2">
                  <MdVerified className="text-2xl" />
                  Blockchain Integration Status
                </h3>
                <p className="body-2 text-white/90">
                  All blockchain networks are operational and synced with Locsafe platform
                </p>
              </div>
              <div className="text-right">
                <p className="headline-4">12/12</p>
                <p className="caption text-white/80">Networks Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainExplorer;
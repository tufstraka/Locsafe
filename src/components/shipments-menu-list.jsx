
const ShipmentsMenuList = ({ index, title, activeTab, setActiveTab }) => {
  const handleIndex = () => {
    setActiveTab(index);
  };
  return (
        <li onClick={handleIndex} className={`font-medium px-2 py-1 mx-1 ${activeTab === index ? 'bg-blue-500 text-white' : 'text-slate-600 dark:text-white cursor-pointer'}`}> 
            {title}
        </li>
  )
}

export default ShipmentsMenuList
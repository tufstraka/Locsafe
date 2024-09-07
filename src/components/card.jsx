
const Card = ({bgHover, textHover, heading, number, joined, iconbg, icon}) => {
  return (
        <div className={`relative w-72 mt-6 mx-auto md:mx-5 lg:mx-0 rounded bg-white px-6 py-5 overflow-hidden text-slate-800 transition-colors duration-500 ${bgHover} ${textHover} dark:text-white dark:bg-night-blue`}>
          <p className="uppercase font-medium text-xs"> {heading} </p>
          <p className="font-bold text-3xl my-2 uppercase"> {number} </p>
          <p className="text-sm"> {joined} Today </p>
          <div className={`absolute -bottom-20 -right-20 rounded-full w-36 h-36 ${iconbg}`}>
            <span className='absolute top-6 left-7 flex items-center text-2xl text-white'> {icon} </span>
          </div>
        </div>  )
}

export default Card
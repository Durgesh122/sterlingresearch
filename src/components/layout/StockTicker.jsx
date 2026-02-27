import { motion } from "framer-motion";

const stockTickerData = [
  { symbol: "NIFTY50", price: "22,530.40", change: "+120.30", percent: "+0.54%" },
  { symbol: "SENSEX", price: "74,230.15", change: "+410.75", percent: "+0.56%" },
  { symbol: "BANKNIFTY", price: "48,150.20", change: "-85.10", percent: "-0.18%" },
  { symbol: "RELIANCE", price: "2,985.60", change: "+45.20", percent: "+1.54%" },
  { symbol: "HDFCBANK", price: "1,540.30", change: "-12.50", percent: "-0.81%" },
  { symbol: "INFY", price: "1,710.45", change: "+25.10", percent: "+1.49%" },
  { symbol: "TCS", price: "4,050.20", change: "+75.60", percent: "+1.90%" },
  { symbol: "ICICIBANK", price: "1,120.50", change: "+8.30", percent: "+0.75%" },
];

const StockTicker = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 py-2 overflow-hidden border-b border-gray-200 dark:border-gray-800">
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap space-x-12 animate-marquee py-1"
          animate={{ x: [0, "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, 
          }}
        >
          {[...stockTickerData, ...stockTickerData, ...stockTickerData].map((stock, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm md:text-base font-semibold min-w-max">
              <span className="text-gray-900 dark:text-gray-100">{stock.symbol}</span>
              <span className="text-gray-700 dark:text-gray-300">{stock.price}</span>
              <span
                className={stock.change.includes("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
              >
                {stock.percent}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StockTicker;

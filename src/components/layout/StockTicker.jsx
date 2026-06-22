import { motion } from "framer-motion";

const stockTickerData = [
  { symbol: "NIFTY50", price: "22,530.40", change: "+120.30", percent: "+0.54%", up: true },
  { symbol: "SENSEX", price: "74,230.15", change: "+410.75", percent: "+0.56%", up: true },
  { symbol: "BANKNIFTY", price: "48,150.20", change: "-85.10", percent: "-0.18%", up: false },
  { symbol: "RELIANCE", price: "2,985.60", change: "+45.20", percent: "+1.54%", up: true },
  { symbol: "HDFCBANK", price: "1,540.30", change: "-12.50", percent: "-0.81%", up: false },
  { symbol: "INFY", price: "1,710.45", change: "+25.10", percent: "+1.49%", up: true },
  { symbol: "TCS", price: "4,050.20", change: "+75.60", percent: "+1.90%", up: true },
  { symbol: "ICICIBANK", price: "1,120.50", change: "+8.30", percent: "+0.75%", up: true },
  { symbol: "GOLD MCX", price: "71,250.00", change: "+320.00", percent: "+0.45%", up: true },
  { symbol: "CRUDE OIL", price: "6,820.00", change: "-45.00", percent: "-0.66%", up: false },
];

const StockTicker = () => {
  return (
    <div className="bg-[#1e5631] py-2 overflow-hidden border-b border-white/10">
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap space-x-10 py-0.5"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {[...stockTickerData, ...stockTickerData, ...stockTickerData, ...stockTickerData].map((stock, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs font-semibold min-w-max px-3">
              <span className="text-[#f0b429] font-bold tracking-wide">{stock.symbol}</span>
              <span className="text-white">{stock.price}</span>
              <span className={stock.up ? "text-green-400" : "text-red-400"}>
                {stock.up ? "▲" : "▼"} {stock.change} ({stock.percent})
              </span>
              <span className="text-white/20 ml-2">|</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StockTicker;

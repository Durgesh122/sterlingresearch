import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import RevealOnScroll from '../components/common/RevealOnScroll';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ComplaintData = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        <ComplaintTable />
        <MonthlyDisposalTable />
        <AnnualDisposalTable />
      </div>
    </div>
  );
};

const ComplaintTable = () => {
  const [headingMonthYear, setHeadingMonthYear] = useState('July 2025');
  const [tableData, setTableData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [errorTable, setErrorTable] = useState(null);

  useEffect(() => {
    const headingRef = ref(database, 'complaintHeaderMonthYear');
    const unsubHeader = onValue(headingRef, (snapshot) => {
      const val = snapshot.val();
      if (typeof val === 'string' && val.trim().length > 0) {
        setHeadingMonthYear(val.trim());
      }
    });

    const tableRef = ref(database, 'complaintTableData');
    const unsubscribe = onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTableData(Array.isArray(data) ? data : Object.values(data));
      } else {
        // Default data if none exists
        setTableData([
            { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
            { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
            { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
            { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
        ]);
      }
      setLoadingTable(false);
    }, (error) => {
      console.error('Error fetching table data:', error);
      setErrorTable('Failed to load table data.');
      setLoadingTable(false);
    });

    return () => {
        unsubHeader();
        unsubscribe();
    };
  }, []);

  return (
    <RevealOnScroll>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-indigo-100 dark:border-indigo-900/30">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {`Complaint Data for ${headingMonthYear}`}
          </h2>
          
          {loadingTable ? (
             <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : errorTable ? (
             <div className="text-red-500 text-center p-4">{errorTable}</div>
          ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100">
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800 text-center">Sr. No.</th>
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800">Received from</th>
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800 text-center">Pending last month</th>
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800 text-center">Received</th>
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800 text-center">Resolved</th>
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800 text-center">Pending</th>
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800 text-center">Pending &gt; 3 Months</th>
                      <th className="p-3 border border-indigo-100 dark:border-indigo-800 text-center">Avg Resolution Time (days)^</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-50 dark:divide-indigo-900/10">
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors text-gray-700 dark:text-gray-300">
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 text-center">{row.srNo}</td>
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 font-medium">{row.source}</td>
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 text-center">{row.pendingLastMonth}</td>
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 text-center">{row.received}</td>
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 text-center">{row.resolved}</td>
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 text-center">{row.pending}</td>
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 text-center">{row.pending3Months}</td>
                        <td className="p-3 border border-indigo-50 dark:border-indigo-800 text-center">{row.avgResolutionTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          )}
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
            ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
          </p>
        </div>
    </RevealOnScroll>
  );
};

const MonthlyDisposalTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const tableRef = ref(database, 'monthlyDisposalTableData');
        onValue(tableRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTableData(Array.isArray(data) ? data : Object.values(data));
            } else {
                 setTableData([
                    { srNo: 1, month: 'April, 2025', carried: 1, received: 0, resolved: 1, pending: 0 },
                    // ... (rest of default data structure if needed, or initialized empty)
                 ]);
            }
        });
    }, []);

    return (
        <RevealOnScroll>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-indigo-100 dark:border-indigo-900/30">
                <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-400">
                  Trend Of Monthly Disposal Of Complaints
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white">
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Sr. No.</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700">Month</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Carried Forward</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Received</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Resolved*</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Pending#</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                             {tableData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors text-gray-700 dark:text-gray-300">
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.srNo}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 font-medium">{row.month}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.carried}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.received}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.resolved}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.pending}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  *Inclusive of complaints of previous months resolved in the current month.<br />
                  #Inclusive of complaints pending as on the last day of the month.
                </p>
            </div>
        </RevealOnScroll>
    );
};

const AnnualDisposalTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const tableRef = ref(database, 'annualDisposalTableData');
        onValue(tableRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTableData(Array.isArray(data) ? data : Object.values(data));
            }
        });
    }, []);

    return (
        <RevealOnScroll>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-indigo-100 dark:border-indigo-900/30">
                <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-400">
                  Trend Of Annual Disposal Of Complaints
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white">
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Sr. No.</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700">Year</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Carried Forward</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Received</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Resolved*</th>
                                <th className="p-3 border border-gray-100 dark:border-gray-700 text-center">Pending#</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                             {tableData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors text-gray-700 dark:text-gray-300">
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.srNo}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 font-medium">{row.year}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.carried}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.received}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.resolved}</td>
                                    <td className="p-3 border border-gray-100 dark:border-gray-700 text-center">{row.pending}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  *Inclusive of complaints of previous years resolved in the current year.<br />
                  #Inclusive of complaints pending as on the last day of the year. (as on 31st March)
                </p>
            </div>
        </RevealOnScroll>
    );
};

export default ComplaintData;
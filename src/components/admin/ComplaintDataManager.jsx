import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../../firebase';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiPlusCircle, FiTrendingUp, FiCheckCircle, FiClock, FiActivity, FiTrash2 } from 'react-icons/fi';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

// ------- Helpers -------
const toNum = (v) => {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

const computeMonthlyGrandTotal = (rows) => {
  return rows.reduce(
    (acc, r) => {
      acc.carried += toNum(r.carried);
      acc.received += toNum(r.received);
      acc.resolved += toNum(r.resolved);
      acc.pending += toNum(r.pending);
      return acc;
    },
    { carried: 0, received: 0, resolved: 0, pending: 0 }
  );
};

const computeAnnualGrandTotal = (rows) => {
  return rows.reduce(
    (acc, r) => {
      acc.carried += toNum(r.carried);
      acc.received += toNum(r.received);
      acc.resolved += toNum(r.resolved);
      acc.pending += toNum(r.pending);
      return acc;
    },
    { carried: 0, received: 0, resolved: 0, pending: 0 }
  );
};

const computeComplaintGrandTotal = (rows) => {
  const totals = rows.reduce(
    (acc, r) => {
      acc.pendingLastMonth += toNum(r.pendingLastMonth);
      acc.received += toNum(r.received);
      acc.resolved += toNum(r.resolved);
      acc.pending += toNum(r.pending);
      acc.pending3Months += toNum(r.pending3Months);
      const art = Number(r.avgResolutionTime);
      if (!isNaN(art)) {
        acc._avgSum += art;
        acc._avgCount += 1;
      }
      return acc;
    },
    { pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, _avgSum: 0, _avgCount: 0 }
  );
  
  const avgResolutionTime = totals._avgCount > 0 ? (totals._avgSum / totals._avgCount).toFixed(2) : 0;
  return {
    pendingLastMonth: totals.pendingLastMonth,
    received: totals.received,
    resolved: totals.resolved,
    pending: totals.pending,
    pending3Months: totals.pending3Months,
    avgResolutionTime,
  };
};

// ------- Components -------

const SummaryCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </motion.div>
);

const EditModal = ({ isOpen, onClose, rowData, onSave, isDeletable, onDelete }) => {
  const [editedRow, setEditedRow] = useState(rowData || {});

  useEffect(() => {
    if (rowData) setEditedRow(rowData);
  }, [rowData]);

  const handleSave = () => {
    if (!editedRow.srNo) return toast.error('Invalid row data.');
    onSave(editedRow);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FiEdit className="text-indigo-500" />
                Edit Data
              </h3>
              {isDeletable && (
                 <button 
                    onClick={() => {
                        if(confirm('Are you sure you want to delete this row?')) {
                            onDelete(editedRow);
                            onClose();
                        }
                    }}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                    <FiTrash2 />
                </button>
              )}
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {Object.keys(editedRow).map(key => (
                key !== 'srNo' && (
                  <div key={key} className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 capitalize mb-1.5">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type={typeof editedRow[key] === 'number' ? 'number' : 'text'}
                      value={editedRow[key] || ''}
                      onChange={(e) => setEditedRow({ ...editedRow, [key]: e.target.value })}
                      disabled={key === 'source' && rowData?.srNo === 'Grand Total'}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                )
              ))}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-all"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SectionHeader = ({ title, color, icon: Icon, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400`}>
            {Icon && <Icon size={20} />}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
    </div>
    {action}
  </div>
);

const ComplaintDataManager = () => {
  const [tableData, setTableData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [annualData, setAnnualData] = useState([]);
  const [headerMonthYear, setHeaderMonthYear] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [modalConfig, setModalConfig] = useState({ open: false, type: null, data: null });

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const refs = [
          ref(database, 'complaintTableData'),
          ref(database, 'monthlyDisposalTableData'),
          ref(database, 'annualDisposalTableData'),
          ref(database, 'complaintHeaderMonthYear')
        ];

        // 1. Complaint Table Listener
        onValue(refs[0], (snap) => {
            const val = snap.val();
            if (val) setTableData(Array.isArray(val) ? val : Object.values(val));
            else { /* Init Logic omitted for brevity, handled by prev logic if needed or empty */ }
        });

        // 2. Monthly
        onValue(refs[1], (snap) => {
            const val = snap.val();
            if (val) setMonthlyData(Array.isArray(val) ? val : Object.values(val));
        });

        // 3. Annual
        onValue(refs[2], (snap) => {
             const val = snap.val();
             if (val) setAnnualData(Array.isArray(val) ? val : Object.values(val));
        });

        // 4. Header
        onValue(refs[3], (snap) => {
             const val = snap.val();
             if (val) setHeaderMonthYear(val);
             setIsLoading(false);
        });

      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (type, newData) => {
    // Optimistic update
    try {
        let dbPath = '';
        let processedData = [];

        if (type === 'MAIN') {
            dbPath = 'complaintTableData';
            // Recalculate Totals
            const working = newData.filter(r => r.srNo !== 'Grand Total');
            const totals = computeComplaintGrandTotal(working);
            processedData = [...working, { srNo: 'Grand Total', source: '', ...totals }];
            setTableData(processedData);
        } else if (type === 'MONTHLY') {
            dbPath = 'monthlyDisposalTableData';
            const working = newData.filter(r => r.srNo !== 'Grand Total');
            const totals = computeMonthlyGrandTotal(working);
            processedData = [...working, { srNo: 'Grand Total', month: '', ...totals }];
            setMonthlyData(processedData);
        } else if (type === 'ANNUAL') {
            dbPath = 'annualDisposalTableData';
            const working = newData.filter(r => r.srNo !== 'Grand Total');
            const totals = computeAnnualGrandTotal(working);
            processedData = [...working, { srNo: 'Grand Total', year: '', ...totals }];
            setAnnualData(processedData);
        }

        await set(ref(database, dbPath), processedData);
        toast.success('Data updated successfully');
    } catch (e) {
        toast.error('Update failed');
    }
  };

  const openEdit = (type, row) => setModalConfig({ open: true, type, data: row });
  
  const onSaveModal = (editedRow) => {
    let currentList = [];
    if (modalConfig.type === 'MAIN') currentList = tableData;
    if (modalConfig.type === 'MONTHLY') currentList = monthlyData;
    if (modalConfig.type === 'ANNUAL') currentList = annualData;

    const newList = currentList.map(r => r.srNo === editedRow.srNo ? editedRow : r);
    handleUpdate(modalConfig.type, newList);
  };

  const onDeleteRow = (rowToDelete) => {
    let currentList = [];
    if (modalConfig.type === 'MONTHLY') currentList = monthlyData;
    if (modalConfig.type === 'ANNUAL') currentList = annualData;
    
    // Check if it's grand total (shouldn't be able to delete anyway based on UI, but safety check)
    if(rowToDelete.srNo === 'Grand Total') return;

    const newList = currentList.filter(r => r.srNo !== rowToDelete.srNo);
    // Re-index simple serial numbers if they are just 1,2,3...
    const reindexedIndex = newList.filter(r => r.srNo !== 'Grand Total').map((r, i) => ({...r, srNo: i + 1}));
    
    handleUpdate(modalConfig.type, reindexedIndex);
    toast.success('Row deleted');
  };

  const addNewRow = (type) => {
      let list = type === 'MONTHLY' ? monthlyData : annualData;
      const working = list.filter(r => r.srNo !== 'Grand Total');
      const nextSr = working.length ? Math.max(...working.map(r => Number(r.srNo))) + 1 : 1;
      
      const newRow = type === 'MONTHLY' 
        ? { srNo: nextSr, month: 'New Month', carried: 0, received: 0, resolved: 0, pending: 0 }
        : { srNo: nextSr, year: 'New Year', carried: 0, received: 0, resolved: 0, pending: 0 };
      
      handleUpdate(type, [...working, newRow]);
  };

  const updateHeader = async () => {
      await set(ref(database, 'complaintHeaderMonthYear'), headerMonthYear);
      toast.success('Header updated');
  };

  if (isLoading) return <LoadingSpinner />;

  // Derived Stats
  const grandTotalRow = tableData.find(r => r.srNo === 'Grand Total') || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Complaint Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Overview of compliance and grievance redressal.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">Report Period</span>
            <input 
                value={headerMonthYear} 
                onChange={(e) => setHeaderMonthYear(e.target.value)}
                className="bg-transparent text-sm font-semibold text-gray-800 dark:text-white outline-none w-32 text-right"
                placeholder="Month Year"
            />
            <button onClick={updateHeader} className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-md transition-colors">
                <FiCheckCircle size={14} />
            </button>
        </div>
      </div>

      {/* 2. Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
            title="Total Received" 
            value={grandTotalRow.received || 0} 
            icon={FiPlusCircle} 
            colorClass="bg-blue-500 text-blue-600" 
            delay={0.1} 
        />
        <SummaryCard 
            title="Total Resolved" 
            value={grandTotalRow.resolved || 0} 
            icon={FiCheckCircle} 
            colorClass="bg-green-500 text-green-600" 
            delay={0.2} 
        />
        <SummaryCard 
            title="Total Pending" 
            value={grandTotalRow.pending || 0} 
            icon={FiClock} 
            colorClass="bg-orange-500 text-orange-600" 
            delay={0.3} 
        />
        <SummaryCard 
            title="Avg Resolution Time" 
            value={`${grandTotalRow.avgResolutionTime || 0} days`} 
            icon={FiActivity} 
            colorClass="bg-purple-500 text-purple-600" 
            delay={0.4} 
        />
      </div>

      {/* 3. Main Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
            <SectionHeader title="Current Month Data" color="indigo" icon={FiActivity} />
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            {['Sr No', 'Received From', 'Pending Last Month', 'Received', 'Resolved', 'Pending', 'Pending > 3M', 'Avg Time', 'Action'].map(h => (
                                <th key={h} className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {tableData.map((row) => (
                            <tr key={row.srNo} className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${row.srNo === 'Grand Total' ? 'bg-indigo-50/60 dark:bg-indigo-900/20 font-bold' : ''}`}>
                                <td className="px-6 py-4">{row.srNo}</td>
                                <td className="px-6 py-4">{row.source}</td>
                                <td className="px-6 py-4 text-center text-gray-500">{row.pendingLastMonth}</td>
                                <td className="px-6 py-4 text-center font-medium text-blue-600">{row.received}</td>
                                <td className="px-6 py-4 text-center font-medium text-green-600">{row.resolved}</td>
                                <td className="px-6 py-4 text-center font-medium text-orange-600">{row.pending}</td>
                                <td className="px-6 py-4 text-center text-gray-500">{row.pending3Months}</td>
                                <td className="px-6 py-4 text-center text-gray-500">{row.avgResolutionTime}</td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => openEdit('MAIN', row)}
                                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    >
                                        <FiEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* 4. Monthly & Annual Grids */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Monthly Disposal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/30">
                 <SectionHeader title="Monthly Trend" color="purple" icon={FiTrendingUp} />
                 <button onClick={() => addNewRow('MONTHLY')} className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-bold hover:bg-purple-200 transition-colors flex items-center gap-1">
                    <FiPlusCircle /> Add Month
                 </button>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            {['Month', 'Carried', 'Received', 'Resolved', 'Pending', 'Action'].map(h => (
                                <th key={h} className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {monthlyData.map((row, i) => (
                             <tr key={i} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${row.srNo === 'Grand Total' ? 'font-bold bg-purple-50/50' : ''}`}>
                                <td className="px-4 py-3 whitespace-nowrap">{row.month}</td>
                                <td className="px-4 py-3 text-center text-gray-500">{row.carried}</td>
                                <td className="px-4 py-3 text-center text-blue-600">{row.received}</td>
                                <td className="px-4 py-3 text-center text-green-600">{row.resolved}</td>
                                <td className="px-4 py-3 text-center text-orange-600">{row.pending}</td>
                                <td className="px-4 py-3 text-center">
                                    {row.srNo !== 'Grand Total' && (
                                        <button onClick={() => openEdit('MONTHLY', row)} className="text-gray-400 hover:text-indigo-600 transition-colors"><FiEdit size={16}/></button>
                                    )}
                                </td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Annual Disposal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/30">
                 <SectionHeader title="Annual Trend" color="green" icon={FiTrendingUp} />
                 <button onClick={() => addNewRow('ANNUAL')} className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold hover:bg-green-200 transition-colors flex items-center gap-1">
                    <FiPlusCircle /> Add Year
                 </button>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            {['Year', 'Carried', 'Received', 'Resolved', 'Pending', 'Action'].map(h => (
                                <th key={h} className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {annualData.map((row, i) => (
                             <tr key={i} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${row.srNo === 'Grand Total' ? 'font-bold bg-green-50/50' : ''}`}>
                                <td className="px-4 py-3 whitespace-nowrap">{row.year}</td>
                                <td className="px-4 py-3 text-center text-gray-500">{row.carried}</td>
                                <td className="px-4 py-3 text-center text-blue-600">{row.received}</td>
                                <td className="px-4 py-3 text-center text-green-600">{row.resolved}</td>
                                <td className="px-4 py-3 text-center text-orange-600">{row.pending}</td>
                                <td className="px-4 py-3 text-center">
                                    {row.srNo !== 'Grand Total' && (
                                        <button onClick={() => openEdit('ANNUAL', row)} className="text-gray-400 hover:text-indigo-600 transition-colors"><FiEdit size={16}/></button>
                                    )}
                                </td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      <EditModal 
        isOpen={modalConfig.open} 
        onClose={() => setModalConfig({ ...modalConfig, open: false })} 
        rowData={modalConfig.data}
        onSave={onSaveModal}
        isDeletable={modalConfig.type !== 'MAIN'}
        onDelete={onDeleteRow}
      />
    </div>
  );
};

export default ComplaintDataManager;
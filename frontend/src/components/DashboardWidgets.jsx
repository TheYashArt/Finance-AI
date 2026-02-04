import React from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
    BarChart, Bar, Legend
} from 'recharts';
import { Calendar, Repeat, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

// --- Summary Cards ---
export const SummaryCards = ({ transactions = [] }) => {
    const totalIncome = transactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const currentBalance = totalIncome - totalExpense;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="glass-card p-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                    <h3 className="text-2xl font-bold text-white">{formatCurrency(currentBalance)}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <DollarSign size={24} />
                </div>
            </div>
            <div className="glass-card p-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Total Income</p>
                    <h3 className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <TrendingUp size={24} />
                </div>
            </div>
            <div className="glass-card p-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Total Expenses</p>
                    <h3 className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                    <TrendingDown size={24} />
                </div>
            </div>
        </div>
    );
};

// --- Category Pie Chart ---
export const CategoryPieChart = ({ transactions = [], categories = [] }) => {
    const expensesByCategory = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => {
            const catName = categories.find(c => c.id === t.category_id)?.name || 'Uncategorized';
            acc[catName] = (acc[catName] || 0) + Math.abs(t.amount);
            return acc;
        }, {});

    const data = Object.keys(expensesByCategory).map((key, index) => ({
        name: key,
        value: expensesByCategory[key],
        color: ['#00D09C', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]
    }));

    if (data.length === 0) {
        return (
            <div className="glass-card h-full flex flex-col items-center justify-center text-gray-500 min-h-[300px]">
                <p>No expense data available</p>
            </div>
        );
    }

    return (
        <div className="glass-card h-fit justify-center flex flex-col">
            <h3 className="font-semibold text-lg mb-4 text-[#00D09C]">Expenses by Category</h3>
            <div className="flex-1 flex flex-col items-center">
                {/* Chart Section */}
                <div className="w-full h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => formatCurrency(value)}
                                contentStyle={{ backgroundColor: '#151A1F', borderColor: '#374151', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend Section - Below */}
                <div className="w-full grid grid-cols-2 gap-3 px-2">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                <span className="text-gray-300 truncate">{item.name}</span>
                            </div>
                            <span className="font-bold shrink-0 text-red-400">{formatCurrency(item.value)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Income Chart (Bar) ---
export const IncomeChart = ({ transactions = [] }) => {
    const dataMap = transactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => {
            const date = new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            acc[date] = (acc[date] || 0) + t.amount;
            return acc;
        }, {});

    const data = Object.keys(dataMap).map(date => ({
        name: date,
        value: dataMap[date]
    })).slice(-7);

    return (
        <div className="glass-card h-full flex flex-col">
            <h3 className="font-semibold text-lg mb-4 text-green-500">Income Trend</h3>
            <div className="flex-1 w-full h-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                        <Tooltip
                            formatter={(value) => formatCurrency(value)}
                            cursor={{ fill: '#374151', opacity: 0.2 }}
                            contentStyle={{ backgroundColor: '#151A1F', borderColor: '#374151', borderRadius: '8px' }}
                            itemStyle={{ color: '#00D09C' }}
                        />
                        <Bar dataKey="value" fill="#00D09C" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// --- Expense Chart (Bar) ---
export const ExpenseChart = ({ transactions = [] }) => {
    const dataMap = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => {
            const date = new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            acc[date] = (acc[date] || 0) + Math.abs(t.amount);
            return acc;
        }, {});

    const data = Object.keys(dataMap).map(date => ({
        name: date,
        value: dataMap[date]
    })).slice(-7);

    return (
        <div className="glass-card h-full flex flex-col">
            <h3 className="font-semibold text-lg mb-4 text-red-500">Expense Trend</h3>
            <div className="flex-1 w-full h-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                        <Tooltip
                            formatter={(value) => formatCurrency(value)}
                            cursor={{ fill: '#374151', opacity: 0.2 }}
                            contentStyle={{ backgroundColor: '#151A1F', borderColor: '#374151', borderRadius: '8px' }}
                            itemStyle={{ color: '#EF4444' }}
                        />
                        <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// --- Balance Chart (Overall Graph) ---
export const BalanceChart = ({ transactions = [] }) => {
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    const data = sortedTx.map(tx => {
        runningBalance += tx.amount;
        return {
            name: new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            value: runningBalance
        };
    });

    const displayData = data.length > 20 ? data.slice(data.length - 20) : data;

    return (
        <div className="glass-card h-full flex flex-col">
            <h3 className="font-semibold text-lg mb-4 text-primary">Overall Balance Trend</h3>
            <div className="flex-1 w-full h-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={displayData}>
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00D09C" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00D09C" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                        <Tooltip
                            formatter={(value) => formatCurrency(value)}
                            contentStyle={{ backgroundColor: '#151A1F', borderColor: '#374151', borderRadius: '8px' }}
                            itemStyle={{ color: '#00D09C' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#00D09C" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// --- Upcoming Recurring List ---
export const UpcomingRecurringList = ({ recurring = [] }) => {
    const sorted = [...recurring].sort((a, b) => new Date(a.next_due_date) - new Date(b.next_due_date)).slice(0, 5);

    return (
        <div className="glass-card h-full">
            <h3 className="font-semibold text-lg mb-4">Upcoming Bills</h3>
            <div className="space-y-4">
                {sorted.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                                <Repeat size={18} />
                            </div>
                            <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                    <Calendar size={10} />
                                    {formatDate(item.next_due_date)}
                                </div>
                            </div>
                        </div>
                        <div className="font-bold text-white">
                            {formatCurrency(item.amount)}
                        </div>
                    </div>
                ))}
                {sorted.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No upcoming bills.</p>
                )}
            </div>
        </div>
    );
};
